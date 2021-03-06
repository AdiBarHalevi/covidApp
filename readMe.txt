our code plan:

how to get data by API:
1- country API provides coutries by regions-->we take the region, and then the countries.
2- covid API provides information per country. 


our plan is to have a two page app. that devides what the user gets from the app
the first option will be:

a graph that gives the covid stats by region.
it will have buttons and with each click you will be shown
the regions covid stats.

** we have a split voice regarding API calls, assuming we get 
a lot of information from the API on the general area call, should
we store it for future use? or should we make a another call for 
specific countries? **

**our perception is to first save the data we need an then we will create functions that
will display it. we want to avoid calling the API for no reason, our call the the api 
will be on demand**

step 2: 
- in order to recive the stats we need we will create an Array the the needed stats
and we will iterate over the array this way we will recive every thing we want.

step 3: during step 2 there will a creation of Object that will save the choosen continent 
data.(**ask Shany regarding allocations**)


data fetching - 1 fetch for each API --> make sure the fech does not 
make any other action beside fetching.

using the Covid app- we will need to take 
the info by name 
(data.name)
()




