here is a rule refresher.


1. if i ask for markdown, always return the response in ~~~ ~~~ blocks
2. use 4 spaces instead of tabs for all indents in all languages and json
3. if a file has not changed, you can say "no changes made" but do not show me code that has not changed.  its a waste of time
4. if you are modifying a file, you must use MY code as a starting point. do not clobber my code!  
5. always be cognizant of reduxing technical debt.
   - avoid cyclomatic complexity
   - adhere to SoC 
     - each file should have a single single responsibility
   - choose design patterns that fit best
   - no hard coding!  
     - move all constants into their own file
     - move all configurable items into a config file
6. if adding new files, begin your response with a simple MD Folder Structure to show the files and folder structure
7. file size.  for maintainability and keep file sizes under 100 lines.   
   - if a file is over 100 lines, you will need to move functions into their own file to maintain single use files
8. When I say STOP! you stop everything immediately and just say OK.


commit it to memory and just say "done."