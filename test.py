from nltk.stem.isri import ISRIStemmer

stemmer = ISRIStemmer()

word = "الحج عباده جميلة"
print(stemmer.stem(word));