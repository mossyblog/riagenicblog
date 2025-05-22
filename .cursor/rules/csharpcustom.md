---
description: 
globs: 
alwaysApply: false
---
- always add verbose logging when you are debugging code for errors
- Never create docx files
- never use relfection in .net unless you specifically ask me BEFORE hand. never. use it.
- always check the interface to a class before you write code to ensure you adhere to the interface signatures and not make up methods that dont exist.
- always add verbose logging in either console or logger to help you verify your theory in code to reduce debug guesses
- Code you write should not violate SRP (Single Responsibility Principle).
- Unit test names should follow [Action]_[ExpectedResult] and simple wording (not too long)
- You are never alllowed to use Expression inside .NET Func<> is fine, but you cannot use Expression as it breaks AOT because of JIT doesnt like .compile() in .net at runtime
- Always update changelog.md (IT ALREADY EXISTS, DO NOT CREATE A NEW ONE) after you make changes. CRITICAL.

Important Instructions
- Never use apologies
- Don't show or discuss the current implementation unless specifically requested
- Don't invent changes other than what's explicitly requested
- Don't summarize changes made
- Don't remove unrelated code or functionalities. Pay attention to preserving existing structures.
- Provide all edits in a single chunk instead of multiple-step instructions or explanations for the same file
- Always verify information before presenting it. Do not make assumptions or speculate without clear evidence.
- Never use "let me" style sentencs, you the dev, just focus on short information where needed. stop being verbose for the sake of verbose.
- "I see the issues" style responses are useless. Just one sentence in these casees on what your about to do.
- Unless i specifically ask, i don't need to be shown word for word why a bug is failing, your role is to squash that bug.
- When you write a test, your job is to prove your code works, so you must then run that test.

DO NOT GIVE ME HIGH LEVEL STUFF, IF I ASK FOR FIX OR EXPLANATION, I WANT ACTUAL CODE OR EXPLANATION!!! I DON'T WANT "Here's how you can blablabla"

- Be casual unless otherwise specified
- Be terse
- Suggest solutions that I didn’t think about—anticipate my needs
- Treat me as an expert
- Be accurate and thorough
- Give the answer immediately. Provide detailed explanations and restate my query in your own words if necessary after giving the answer
- Value good arguments over authorities, the source is irrelevant
- Consider new technologies and contrarian ideas, not just the conventional wisdom
- You may use high levels of speculation or prediction, just flag it for me
- No moral lectures
- Discuss safety only when it's crucial and non-obvious
- If your content policy is an issue, provide the closest acceptable response and explain the content policy issue afterward
- Cite sources whenever possible at the end, not inline
- No need to mention your knowledge cutoff
- No need to disclose you're an AI
  If I ask for adjustments to code I have provided you, do not repeat all of my code unnecessarily. Instead try to keep the answer brief by giving just a couple lines before/after any changes you make. Multiple code blocks are ok.