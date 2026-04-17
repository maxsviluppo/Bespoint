
import sys

with open(r'c:\Users\Max\Downloads\A Codici Main\bespoint-main\src\App.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix 1: Slides block (around 4741)
# We already fixed it in the previous step, but let's check again.
# Wait, I already removed one in slides.

# Fix 2: Categories block (around 5013)
# We need to remove the extra divs.
# The target lines are 5013, 5014. These should be </div> </div>
# But wait, the line numbers might have shifted.

# Let's find the 'adminActiveTab === "categories"' check and count divs.
# Or better, just target the specific sequence near "link_rapidi".

content = "".join(lines)
import re

# We want to find the Categories block end and Link Rapidi start.
# Looking for:
# </div>
# </div>
# </div>
# </div>
# </div>
# )}
# 
# {adminActiveTab === ('link_rapidi'

pattern = re.compile(r'(</div>\s+){5}\s+\)}\s+\n\s+{adminActiveTab === \(\'link_rapidi\'', re.MULTILINE)
# We want to change 5 divs to 3 divs.

def replacement(match):
    return "</div>\n                      </div>\n                    </div>\n                  )}\n\n                {adminActiveTab === ('link_rapidi'"

# Actually, let's be safer and just count the block.

fixed_content = re.sub(r'(</div>\s+){5}\s+\)}\s+\n\s+{adminActiveTab === \(\'link_rapidi\'', 
                       r'</div>\n                      </div>\n                    </div>\n                  )}\n\n                {adminActiveTab === ("link_rapidi"', 
                       content)

with open(r'c:\Users\Max\Downloads\A Codici Main\bespoint-main\src\App.tsx', 'w', encoding='utf-8') as f:
    f.write(fixed_content)
print("Done")
