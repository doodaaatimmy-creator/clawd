#!/bin/bash
# Gmail utility for Donny
# Retrieves credentials from Keychain, never stores in plain text

GMAIL_ACCOUNT="doodaaatimmy@gmail.com"
KEYCHAIN_SERVICE="donny-gmail-app"

get_password() {
    security find-generic-password -a "$GMAIL_ACCOUNT" -s "$KEYCHAIN_SERVICE" -w 2>/dev/null
}

send_email() {
    local to="$1"
    local subject="$2"
    local body="$3"
    local password=$(get_password)
    
    if [ -z "$password" ]; then
        echo "Error: Could not retrieve password from Keychain"
        return 1
    fi
    
    # Using curl with Gmail SMTP
    curl --ssl-reqd \
        --url "smtps://smtp.gmail.com:465" \
        --user "$GMAIL_ACCOUNT:$password" \
        --mail-from "$GMAIL_ACCOUNT" \
        --mail-rcpt "$to" \
        -T - <<EOF
From: Donny <$GMAIL_ACCOUNT>
To: $to
Subject: $subject
Date: $(date -R)
Content-Type: text/plain; charset=UTF-8

$body
EOF
}

check_inbox() {
    local password=$(get_password)
    
    if [ -z "$password" ]; then
        echo "Error: Could not retrieve password from Keychain"
        return 1
    fi
    
    # Using curl to check IMAP inbox (last 5 messages)
    curl --ssl-reqd \
        --url "imaps://imap.gmail.com/INBOX" \
        --user "$GMAIL_ACCOUNT:$password" \
        -X "FETCH 1:5 (BODY[HEADER.FIELDS (FROM SUBJECT DATE)])" \
        2>/dev/null
}

case "$1" in
    send)
        send_email "$2" "$3" "$4"
        ;;
    check)
        check_inbox
        ;;
    password)
        # For internal use only - retrieves password
        get_password
        ;;
    *)
        echo "Usage: gmail.sh [send|check|password]"
        echo "  send <to> <subject> <body>"
        echo "  check - Check inbox"
        ;;
esac
