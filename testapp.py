import sys
import re

import pyarabic.arabrepr
from tashaphyne.stemming import ArabicLightStemmer
from snowballstemmer import stemmer
ArListem = ArabicLightStemmer()

def getRoots(word=""):
     ArListem = ArabicLightStemmer()
     
     myStemmer = stemmer("arabic")
     word = myStemmer.stemWord(word)
     
     stem = ArListem .light_stem(word)
    

     return ArListem.get_root()




def main():
    word = u'الحج عبادة جميلة'.strip()
    word = word.split()
    stemmed = ""
    for i in word:
        x = getRoots(i.replace("ال",""))
        if x != None and len(i)>2:
            print(x,end=" ")

   
main()
