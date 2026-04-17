
import sys

def count_tokens(content):
    parens = 0
    braces = 0
    brackets = 0
    in_string = False
    string_char = ''
    escaped = False
    
    for i, char in enumerate(content):
        if escaped:
            escaped = False
            continue
        if char == '\\':
            escaped = True
            continue
            
        if in_string:
            if char == string_char:
                in_string = False
            continue
            
        if char in ("'", '"', '`'):
            in_string = True
            string_char = char
            continue
            
        if char == '(': parens += 1
        elif char == ')': parens -= 1
        elif char == '{': braces += 1
        elif char == '}': braces -= 1
        elif char == '[': brackets += 1
        elif char == ']': brackets -= 1
        
        if parens < 0 or braces < 0 or brackets < 0:
            print(f"Error at index {i}: negative count (parens:{parens}, braces:{braces}, brackets:{brackets})")
            print(content[max(0, i-50):min(len(content), i+50)])
            # break
            
    print(f"Final counts: parens:{parens}, braces:{braces}, brackets:{brackets}")

with open(r'c:\Users\Max\Downloads\A Codici Main\bespoint-main\src\App.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    content = "".join(lines[2850:3500])
    count_tokens(content)
