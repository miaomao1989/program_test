

shannon_pangram =  "squdgy fez, blank jimp crwth vox"
jock_pangram = "mr. jock, tv quiz phd, bags few lynx."

MAX_CHARACTER_NUM = 26

def pangram_filter(pangram):
    code_book = ''
    for ch in range(len(pangram)):
#        print pangram[ch], '(%d)' %ch
        if (pangram[ch] < 'a') or (pangram[ch] > 'z'):
                continue
        else:
            code_book += pangram[ch]
    assert len(code_book) == 26
#    print('pangram_filter: %s' %code_book)
    return code_book



def code(ch, pangram = "squdgy fez, blank jimp crwth vox"):
    if (ch < 'a') or (ch > 'z'):
        return ch
    else:
        code_book = pangram_filter(pangram)
#        print('%s : ' %code_book[ (code_book.find(ch) + 1) % (MAX_CHARACTER_NUM - 1) ])
        return code_book[ (code_book.find(ch) + 1) % (MAX_CHARACTER_NUM) ]






print('code %s' %code('a',shannon_pangram))
print('code %s' %code('x',shannon_pangram))
print('code %s' %code('r'))
print('code %s' %code('s', jock_pangram))
print('code %s' %code('x', jock_pangram))
