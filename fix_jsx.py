
import re

file_path = r'c:\Users\Max\Downloads\A Codici Main\bespoint-main\src\App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find the end of review_form block and the following closures
# We want to insert </> before the </div> that closes <div className="space-y-6"> opened at 6003

# Search for the specific button and div sequence
pattern = r'Invia Recensione"\s+\)}\s+</button>\s+</div>\s+</div>\s+\)}\s+</div>\s+\)}'

# Let's be more flexible with whitespace
pattern_flex = r'Invia Recensione"\s+\)}\s+</button>\s+</div>\s+</div>\s+\)}\s+</div>\s+\)}'

result = re.search(pattern_flex, content)
if result:
    print(f"Found match at {result.start()}")
    # Replace the part:
    # )}\s+</div>\s+)}
    # with
    # )}\s+</>\s+</div>\s+)}
    
    # Wait, let's find the specific block more precisely
    # ... )}\s+</div>\s+)} -> this matches the end of review_form check, then the profile div, then the profile check.
    
    # Let's just fix the fragment closure by finding line 6004 and matching its end.
    
    # Actually, let's use the line num approach if possible.
    lines = content.splitlines()
    # 6451: </div>
    # 6452: )}
    # 6453: </div>
    # 6454: )}
    
    # Since I don't know the exact lines after my failed edits, I'll search for the review_form end.
    for i in range(len(lines)-5, 6000, -1):
        if 'Invia Recensione' in lines[i] and '</button>' in lines[i+2]:
             # We are around the end.
             # i+4: </div>
             # i+5: </div>
             # i+6: )}
             # i+7: </div>  <-- this should be preceded by </>
             # i+8: )}
             print(f"Candidate at line {i}")
             # Check if we can find </div> )} </div> )} sequence
             if '</div>' in lines[i+4] and '</div>' in lines[i+5] and ')}' in lines[i+6] and '</div>' in lines[i+7] and ')}' in lines[i+8]:
                 lines.insert(i+7, '                          </>')
                 break

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print("Done")
else:
    print("No match found")
