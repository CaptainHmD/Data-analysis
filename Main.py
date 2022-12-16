import snscrape.modules.twitter as twitterScraper
import threading
import xlsxwriter

Hashtags = ["الحج و العمرة", "جبل الرحمة", "الحرم", "المسجد النبوي", "المشاعر المقدسة"]
threads = []

workbook = xlsxwriter.Workbook("Tweets.xlsx")
sheet = workbook.add_worksheet()
sheet.set_column(0, 0, 100)
sheet.set_column(1, 3, 20)
sheet.xls_rowmax = 1000_000
sheet.write(0, 0, "Tweet")
sheet.write(0, 1, "Likes")
sheet.write(0, 2, "Retweets")
sheet.write(0, 3, "Account")
sheet.write(0, 4, "Date")
sheet.write(0, 5, "Hashtag")
counter = 0


def scrape(Hashtag):
    global tweetCount
    start = "since:2014-1-1"
    end = "until:2022-1-1"
    scraper = twitterScraper.TwitterSearchScraper(f"{Hashtag} {start} {end}")
    for i, tweet in enumerate(scraper.get_items()):
        if i == 1000_000:
            break
        writeToXl(
            tweet.rawContent,
            tweet.likeCount,
            tweet.retweetCount,
            tweet.user.username,
            tweet.date,
            Hashtag,
            i,
        )


def writeToXl(content, likes, retweets, account, date, hashtag, i):
    global counter
    counter+=1
    string = content.encode("utf8")
    sheet.write(i + 1, 0, string.decode("utf-8"))
    sheet.write(i + 1, 1, likes)
    sheet.write(i + 1, 2, retweets)
    sheet.write(i + 1, 3, account)
    sheet.write(i + 1, 4, date.strftime("%Y-%m-%d"))
    sheet.write(i + 1, 5, f"#{hashtag}")
    


for i, text in enumerate(Hashtags):
    threads.append(threading.Thread(target=scrape, args=(text))) 
    threads[i].start()


for i in threads:
    i.join()


workbook.close()