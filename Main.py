import snscrape.modules.twitter as twitterScraper
import threading
import timeit

Hashtags = ["الحج و العمرة","جبل الرحمة","الحرم","المسجد النبوي","المشاعر المقدسة"]



start = timeit.default_timer()
def scrape(Hashtag):
     start = "since:2013-12-27"
     end   = "until:2022-1-1"
     scraper = twitterScraper.TwitterSearchScraper(f"{Hashtag} {start} {end}")
     with open(f"{Hashtag}.txt","w",encoding="utf-8") as file:          
       for i,tweet in enumerate(scraper.get_items()):
          file.write(f"{tweet.content}")


thread1 = threading.Thread(target=scrape,args=(Hashtags[0],))
thread2 = threading.Thread(target=scrape,args=(Hashtags[1],))
thread3 = threading.Thread(target=scrape,args=(Hashtags[2],))
thread4 = threading.Thread(target=scrape,args=(Hashtags[3],))
thread5 = threading.Thread(target=scrape,args=(Hashtags[4],))

thread1.start()
thread2.start()
thread3.start()
thread4.start()
thread5.start()

thread1.join()
thread2.join()
thread3.join()
thread4.join()
thread5.join()


stop = timeit.default_timer()
