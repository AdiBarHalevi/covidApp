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


after a while into the project it decided to change my goals and focus on 1 feature 
the user will chose a continent --> and then he can choose a country (as requested)
i've added another API call with the flag of the country that is checked
and another table displaying the corona state at the chosen country.

- disabled the ability of the user to call the API during loading state.
- added a scroll after loading ends, also added a spinner.

bugs:
1. after loading the page, and choosing a specific country if there is 
another continent chosen the lower table is not updating well(didn't have time
to update it properly-easy fix)
2. after loading the primary table(page 2) it does not update unless you
interact with the buttons - i do not know the reason, added a click by code
that helps the table "refresh itself"
3.i've done some media querry, didn't had the time to adjust it completly 
it still has work to be done there.

overal the task was good, didn't had specific issues and I really enjoy doing it.



