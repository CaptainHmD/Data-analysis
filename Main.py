import snscrape.modules.twitter as twitterScraper
import threading
Hashtags = ["الحج و العمرة","جبل الرحمة","الحرم","المسجد النبوي","المشاعر المقدسة","الحج","العمرة","الجمرات","منى"]
threads = []


def scrape(Hashtag):
     #set starting date and end date
     start = "since:2021-12-29"
     end   = "until:2022-1-1"
     #set Hashtag and date
     scraper = twitterScraper.TwitterSearchScraper(f"{Hashtag} {start} {end}")
     #create txt file with hashtag and set encoding to utf-8 to support Arabic
     with open(f"{Hashtag}.txt","w",encoding="utf-8") as file:
       #for each tweet we scrape          
       for i,tweet in enumerate(scraper.get_items()):
          #if we got 50 break out of loop
          if i > 50:
            break
          file.write(f"{tweet.rawContent}")

#initialise all threads
for i,text in enumerate(Hashtags):
  threads.append(threading.Thread(target=scrape,args=(text,)))
  threads[i].start()
  
#Make all threads wait after they finish
for i in threads:
  i.join()
