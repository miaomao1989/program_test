import numpy as np
from matplotlib import pyplot


means   = [105.402, 7.614 ,7.641 ,8.099, 18.197, 39.984]         # Mean Data 
stds    = [(0,0,0,0,0,0), [16.238, 5.479, 4.093 , 1.282, 1.689, 71.993]]            # Standard deviation Data
# peakval = ['26.82','26.4','61.17','61.55'] # String array of means
peakval   = ['105.402','7.614','7.641','8.099', '18.197', '39.984']         # Mean Data 

ind = np.arange(len(means))
width = 0.7
#colours = ['red','blue','green','yellow']
colours = ['yellow']

pyplot.figure()
for i in range(len(means)):
        #pyplot.bar(ind[i], means[i], width , color=colours[0], align='center', yerr=stds[i], ecolor='k')
        pyplot.bar(ind, means, width, color=colours, align='center', yerr=stds, ecolor='k')
pyplot.ylabel('Latency (us)')
pyplot.xlabel('Batch Size')
pyplot.xticks(ind,('8','16', '32','64','128', '256'))

def autolabel(bars,peakval):
    for ii,bar in enumerate(bars):
        height = bars[ii]
        pyplot.text(ind[ii], height-8, '%s'% (peakval[ii]), ha='center', va='bottom')
autolabel(means,peakval)  
pyplot.show()

