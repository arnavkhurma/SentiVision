import csv

with open('LinearData.csv', mode='r')as file:
    csvFile = csv.reader(file)
    for lines in csvFile:
        print(lines)
