'''
Name:           4-2.py
Author:         chenjue
Mail:           xxxx
Date:           Sep, 28th, 2015
Version:        1.0.0

Description:    This program is for Assignment 4, Course ID: xxxx
code() function is for Problem 1;
code_message() function is for Problem 2; (You can check the assignment specification for problem detail)

If you have any question, please let me know. Enjoy ~
'''

shannon_pangram =  "squdgy @##$R fez, blank jimp crwth vox"
jock_pangram = "mr. jock, tv quiz phd, bags few lynx."


# the max number of 26 letter
MAX_CHARACTER_NUM = 26

# pangram_filter() function: filter any space and punctuation mark in the pangram, and return the 'pure' 26 letter for code()

def pangram_filter(pangram):
    code_book = ''
    for ch in range(len(pangram)):
#        print pangram[ch], '(%d)' %ch
        if (pangram[ch] < 'a') or (pangram[ch] > 'z'):
                continue
        else:
            code_book += pangram[ch]
    assert len(code_book) == MAX_CHARACTER_NUM 
#    print('pangram_filter: %s' %code_book)
    return code_book

# code() function: get the next character for 'ch' in 'pangram' character sequence

def code(ch, pangram = shannon_pangram):
    if (ch < 'a') or (ch > 'z'):
        return ch
    else:
        code_book = pangram_filter(pangram)
#        print('%s : ' %code_book[ (code_book.find(ch) + 1) % (MAX_CHARACTER_NUM) ])
        return code_book[ (code_book.find(ch) + 1) % (MAX_CHARACTER_NUM) ]

def code_message(message, code):
    result = ''
    for ch in message:
        result += code(ch)
    return result






#######################################################
# If you want to test, just delete '#' character

### testing for code() function

print('code %s' %code('y',shannon_pangram))
print('code %s' %code(1))
#print('code %s' %code('r'))
#print('code %s' %code('s', jock_pangram))
#print('code %s' %code('x', jock_pangram))



### testing for code_message() function

#print("code_message : %s" %code_message('hello hal', code))

