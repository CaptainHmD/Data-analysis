import pandas as pd
from tashaphyne.stemming import ArabicLightStemmer
from snowballstemmer import stemmer
tweets=None


def getRoots(word=""):
     ArListem = ArabicLightStemmer()
     
     myStemmer = stemmer("arabic")
     word = myStemmer.stemWord(word)
     
     stem = ArListem .light_stem(word)
    

     return ArListem.get_root()

with open("Tweets.xlsx",'rb') as f:
     tweets=pd.read_excel(f)

stemmedTweets = []



for i,j in enumerate(tweets['Tweet']):
   tweets['Tweet'][i]= str(j).replace("_x000D_","") 
   stemmedTweets.append(getRoots(tweets['Tweet'][i].replace("ال","")))


tweets['Stemmed']=stemmedTweets
writer = pd.ExcelWriter("x.xlsx",engine="xlsxwriter")
tweets.to_excel(writer,sheet_name="Sheet1")
workbook = writer.book
worksheet = writer.sheets['Sheet1']


worksheet.set_column(1,1,150)
worksheet.set_column(7,7,150)
worksheet.set_column(2, 7, 20)

writer.close()





