import pygame
import random
from tkinter import Tk
from tkinter import messagebox

def initHeight(height_screen,number_of_elements):
    height=[random.randint(1,height_screen-10) for _ in range(number_of_elements)]
    return height

def showCompMsg(algo):
    window=Tk()
    window.withdraw()
    messagebox.showinfo('Message',algo+' completed')
    window.destroy()
    window.quit()

def updateScreen(win,x,y,width,height):
    win.fill((0,0,0))
    for i in range(number_of_elements):
        pygame.draw.rect(win,(0,0,255),(x+(width+5)*i,y,width,height[i]))
    pygame.time.delay(20)
    pygame.display.update()

def bubbleSort(win,x,y,width,height):
    for i in range(len(height)-1):
        for j in range(len(height)-i-1):
            if height[j]>height[j+1]:
                height[j],height[j+1]=height[j+1],height[j]
            updateScreen(win,x,y,width,height)

def insertionSort(win,x,y,width,height):
    for i in range(1,len(height)):
        key=height[i]
        j=i-1
        while j>=0 and height[j]>key:
            height[j+1]=height[j]
            j-=1
        height[j+1]=key
        updateScreen(win,x,y,width,height)

def selectionSort(inpArr):
    for i in range(len(inpArr)):
        index=i
        for j in range(i+1,len(inpArr)):
            if inpArr[index]>inpArr[j]:
                index=j
        if index!=i:
            inpArr[index],inpArr[i]=inpArr[i],inpArr[index]
            
x=10
y=0
width=5
number_of_elements=60
width_screen=600
height_screen=400
height=initHeight(height_screen,number_of_elements)

if __name__=='__main__':
    pygame.init()
    print('enter b for bubblesort\nenter i for insertionSort')
    while True:

        win = pygame.display.set_mode((width_screen,height_screen))
        updateScreen(win,x,y,width,height)
        algo=""
        algoCompl=False

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_b:
                    bubbleSort(win,x,y,width,height)
                    algo="bubble sort"
                    algoCompl=True
                elif event.key == pygame.K_i:
                    insertionSort(win,x,y,width,height)
                    algo="insertion sort"
                    algoCompl=True

            if algoCompl:
                showCompMsg(algo)
                height=initHeight(height_screen,number_of_elements)
                updateScreen(win,x,y,width,height)
                algoCompl=False
                algo=""

    pygame.quit()
