# Grant Writing AI Resources
> Extracted from [ai-for-grant-writing](https://github.com/eseckel/ai-for-grant-writing) repository
> Analysis date: 2025-01-28

## Executive Summary
This repository is a curated collection of AI tools, prompts, and educational resources for grant writing. It's primarily focused on **academic/research grants** (NIH, NSF, postdoctoral fellowships) rather than nonprofit/foundation grants. Key value for Grant Forge: prompt templates and competitive landscape insights.

---

## 🛠️ Competitor/Tool Landscape

### AI Services Comparison

| Service | Spelling/Grammar | Text Gen | Translation | Mock Review | Image Gen | Free Tier |
|---------|-----------------|----------|-------------|-------------|-----------|-----------|
| **ChatGPT** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Copilot** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Grammarly** | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| **Bard/Gemini** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Grok** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Curie (AJE)** | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **DeepL** | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| **Midjourney** | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Firefly** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |

### Key Insight for Grant Forge
**Gap identified:** No dedicated grant-writing AI platform in this list. General-purpose LLMs are being used with manual prompting. Grant Forge can differentiate by:
- Pre-built grant-specific workflows
- Funder database integration
- Automated review criteria alignment
- Template library

---

## 📝 Prompt Templates (USE THESE)

### 1. Text Clarity Enhancement
```
As a non-native English speaker, kindly help me revise the following text for improved understanding and clarity. Please check for spelling and sentence structure errors and suggest alternatives.
```
```
Please identify any parts of my writing that may be difficult for a lay audience to understand.
```

### 2. Persuasive Writing
```
Please provide feedback on my writing style and how I can make it more persuasive and compelling for the grant reviewer.
```
```
I'm trying to hook my reader with a strong introduction. Can you suggest a more captivating first sentence to draw them in from the start?
```

### 3. Structure & Organization
```
I want to improve the overall structure of my Specific Aims. What tips do you have to structure it more effectively?
```
```
Can you recommend an effective way to organize my Significance section to highlight the innovative aspects of our approach?
```
```
Please provide detailed feedback on the flow and sequence of my research strategy.
```

### 4. Funder Alignment (HIGH VALUE)
```
I'm working on a [FELLOWSHIP TYPE] application. Can you please review my closing paragraph and suggest ways to better align it with [FUNDER]'s mission?
```
```
How can I better align my proposal to specifically address the [SPECIFIC CRITERIA] outlined in this funding announcement for [FUNDING OPPORTUNITY NAME]?
```

### 5. Review Criteria Matching
```
I am applying to [FELLOWSHIP NAME]. Please provide me feedback on how well I am addressing this review criteria: [SPECIFIC REVIEW CRITERIA], and suggestions for what I am missing and how I can improve.
```

### 6. Title Generation
```
Suggest five potential titles for a grant proposal that will attract readers while encompassing the research question and key elements from the provided abstract: [ABSTRACT]
```

### 7. Risk Identification
```
Help identify potential challenges that may arise with my proposed aims and suggest strategies to address them: [SPECIFIC AIMS]
```
```
What are some potential questions or concerns that [FUNDER] reviewers may have regarding my specific aims? [SPECIFIC AIMS]
```

### 8. Timeline Development
```
Assist in developing a detailed project timeline and milestones for my grant proposal to demonstrate feasibility using my project summary and specific aims: [PROJECT SUMMARY]
```
```
Please develop a feasible project timeline for my grant proposal relating to my career development plan using this list of activities [ACTIVITIES] for [XX months] starting in [MONTH].
```

---

## 📚 High-Value Educational Resources

### Must-Read Papers & Guides
1. **[Ten simple rules to leverage large language models for getting grants](https://dx.plos.org/10.1371/journal.pcbi.1011863)** - PLOS Computational Biology, peer-reviewed best practices
2. **[Best Kept Secrets to Winning Grants](https://www.nature.com/articles/545399a)** - Nature, insider tips
3. **[The Anatomy of a Specific Aims Page](https://biosciencewriters.com/NIH-Grant-Applications-The-Anatomy-of-a-Specific-Aims-Page.aspx)** - NIH-specific structure guide
4. **[R01 Countdown: Tools for Writing Concise and Compelling Grants](https://purl.stanford.edu/yy394gb6954)** - Stanford resource

### Agency-Specific Guidelines
- **NIH:** [Grant Writing Tip Sheets](https://grants.nih.gov/grants/how-to-apply-application-guide/format-and-write/write-your-application.htm)
- **NSF:** [Guide for Proposal Writing](https://www.nsf.gov/pubs/2004/nsf04016/nsf04016_5.htm)
- **General:** [Grants.gov Writing Basics](https://grantsgovprod.wordpress.com/category/learngrants/grant-writing-basics/)

### Academic Writing Craft
- [On the Art of Writing Proposals (SSRC)](https://www.ssrc.org/publications/the-art-of-writing-proposals/)
- [Grant Proposals - UNC Writing Center](https://writingcenter.unc.edu/tips-and-tools/grant-proposals-or-give-me-the-money/)
- [Stanford Planning Tips](https://grantwriting.stanford.edu/students/tips-for-planning-your-proposal/)

---

## 🔗 Prompt Engineering Resources

### Official Best Practices
- [Google Cloud: 5 Best Practices](https://cloud.google.com/blog/products/application-development/five-best-practices-for-prompt-engineering)
- [OpenAI: Prompt Engineering Guide](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api)
- [Awesome GPT Prompt Engineering (GitHub)](https://github.com/snwfdhmp/awesome-gpt-prompt-engineering)

### Prompt Collections
- [85+ ChatGPT Prompts for Grant Writing](https://aihabit.net/chatgpt-prompts-for-grant-writing/)
- [ClickUp: Research Writing Prompts](https://clickup.com/templates/ai-prompts/research-writing)

---

## 💡 Grant Forge Integration Opportunities

### Features to Build Based on This Research

1. **Prompt Library Module**
   - Pre-built prompts for each grant section
   - Funder-specific prompt variants
   - One-click prompt insertion

2. **Review Criteria Analyzer**
   - Parse FOA (Funding Opportunity Announcement) documents
   - Extract review criteria automatically
   - Score draft against criteria

3. **Funder Alignment Tool**
   - Database of funder missions/priorities
   - Auto-suggest alignment improvements
   - Mission statement comparison

4. **Mock Review Feature**
   - Simulate reviewer feedback
   - Score on NIH/NSF criteria
   - Identify weaknesses before submission

5. **Timeline Generator**
   - Input activities → generate Gantt chart
   - Feasibility scoring
   - Milestone tracking

6. **Title Optimizer**
   - Generate multiple title options
   - A/B test with AI reviewer
   - Keyword optimization for searchability

### Data Sources to Consider
- **Grants.gov** - Federal grant database
- **NIH Reporter** - Funded grant abstracts (training data gold!)
- **NSF Award Search** - Successful proposals
- **Foundation Directory Online** - Private funders

---

## 🎯 Key Takeaways for Grant Forge

1. **Market Gap Exists** - No dedicated AI grant-writing platform; everyone uses general LLMs with manual prompting

2. **Academic Focus Dominates** - Most resources target NIH/NSF research grants; opportunity for nonprofit/foundation expansion

3. **Prompts Are Key** - Curated, tested prompts are extremely valuable; build a library

4. **Review Simulation** - "Mock review" capability is highly desired (noted in tool comparison)

5. **Funder Alignment** - Matching proposals to funder missions is a pain point we can automate

6. **Structure Templates** - Specific Aims, Significance sections have known best practices to encode

---

## 📂 Source Repository
- **Original:** https://github.com/eseckel/ai-for-grant-writing
- **Fork analyzed:** https://github.com/doodaaatimmy-creator/ai-for-grant-writing
- **License:** CC BY 4.0 (can use with attribution)
- **Last updated:** Active community project

---

*Generated for Grant Forge project research*
