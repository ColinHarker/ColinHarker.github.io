---
layout: post
title:  "Intro to Web Development"
date:   2016-03-30 11:00:31
categories: webdev d3
---

Hello I'm Steven.  At the time of writing this I'm a second year PhD student and the TA for information visualization.  This tutorial should hopefully get someone who knows a bit of programming to being able to use and modify visualizations in D3. D3 is a nice tool for making visualizations and displaying them in the browser, and even though it can do more than that in this series we shall focus on the visualization aspects of it.  So let's get started.  

### Sections:  
[Getting Started](#getting-started)  
[Next Steps](#next-steps-with-css)  
[Just Javascript](#just-javascript)  
[Debugging](#debugging)  
[D3](#d3-doing-debugging-done)   
[Extra Resources](#extra-resources)

## Getting Started

In this section we will build a simple website which will be needed to test out the code later.  First thing's first we need to pick an editor to write and work with.  Notepad is okay, vim is good (best for working over a server), and my personal preference is [sublime](https://www.sublimetext.com/3).  In sublime you can download packages to make building a website easier like emmet and even a package for assisting in code completion for D3.js.  

This first example is to get you to see something a bit more complicated than necessary and then we will strip away the unnecessary details 

{% highlight HTML %}
<!DOCTYPE html>
<html lang="en">
<head>
	<title>My First Awesome Webpage</title>
</head>
<body>
	
</body>
</html>
{% endhighlight %}

If you downloaded emmet in sublime you can quickly type all of this by typing "html:5" (without quotes) and pressing Ctrl + e. 

A quick intro HTML is short for hypertext markup language, fancy terms but basically meaning it isn't a programming language which means it can't do much on its own. You can think about html as specifying the content of a web page by enclosing the content like words, paragraphs, images etc. in the page by some descriptor in the these <>. The things enclosed in <> are called **tags** for example head, body, title are all tags. The objects enclosed between <> and </> are called **elements** for example "My First Awesome Webpage" is an element.  This format serves to let the browser know how the elements should be processed to be displayed on the browser.

So html is read in blocks.  <>  this is an opening bracket. </> this is a closing bracket and they usually come in pairs.

	<!DOCTYPE html>

This part here specifies that we are writing a webpage specifically in html format.  This part is essential and must always be there for a webapge to be properly displayed so always include it.

	<html lang="en">

This tag does two things: first it starts the html document by specifying the "html" in the brackets. Secondly in the same tag it tells the browser what language all (or the majority) of our text on the webpage will be in with "lang="en"". In this case en is short for english.  Here you can see an example of how multiple things can specified in one tag.  

	<head>
		...
	</head>

This part opens something on webpages called the head as designated by <head> and then closes it like so </head>.  The head basically gives an overview of the webpage for your web browser.  In the example above it sets the title of the webpage to be "My First Awesome Webpage".

Here we have where the majority of the content in a webpage will go.  You can think of the <body> like the body of essay where it contains all of the actual content and majority of what's actually on the page goes in here.

Finally there's the closing </html>.  This tells the browser that it is the end of the document because it closes the opening DOCTYPE html.  

Well that was a bit tedious now lets get rid of what we don't need and keep the bare minimum.  Open your favorite editor and let's make a website. Copy the code below and paste it into a file called "index.html" (without quotes).


{% highlight HTML %}
<!DOCTYPE html>
<body>
	<p>Hello World</p>
</body>
</html>
{% endhighlight %}

Now that we have this how can we actually view and test our code?  

There are many ways to do this and I'll go with the one I've found to be the easiest.  Install python or python3 if you don't already have it installed.  Use this [Install Python](https://wiki.python.org/moin/BeginnersGuide/Download) for help in installing python.  I personally recommend installing python3 instead of python 2 as python2.7 is legacy and will be deprecated and not maintained anymore in the near future.


Next open up a terminal (or some place where you can execute python code).    Next run this command

	python -m http.server

Some notes:  
if you installed or have installed python2.7 replace "http.server" with "SimpleHTTPServer".  
you might need to replace "python" with with "python3"  
Make sure the index.html is saved in the same directory that your terminal directory is currently in (typically your home or user directory).  If index.html is saved somewhere else move it to your home directory or whatever directory you are in, in your current terminal session.  

Finally open up your browser and type in this link into your web browser

http://localhost:8000/

You should be able to see Hello World in your web browser


## Next Steps With CSS

Since the purpose of this tutorial is to quickly get someone up and running with a website that can run D3 we shall only talk briefly about CSS here. CSS stands for Cascading Style Sheets.  This is what specifies the styles, positionings, colors, etc. of the elements in a web site.

Why do we need CSS if we are going to be working with D3 primarily? Well the truth is we don't need a dedicated CSS page but a lot of what D3 uses to change the colors of it's graphs and figures relies on CSS in the background. So a lot of the notation you'll encounter is exactly the same as (or very similar to) CSS for that reason we will cover CSS.

#### Style it up

We will make a basic css file and work through its notation as well as expand a bit on our previous html example.


{% highlight CSS %}
body p {color:blue;}
p {color:red;}
p {
	background-color: rgb(255, 255, 128); 
	text-align: center;
}
{% endhighlight %}

The first line is read that any p tag contained within a body tag will be colored blue.  The next line though states that any p tag will be colored red. Finally we have that any p tag will have this rgb background color and be center aligned.  

There's a sort of conflict presented here, which color will the p tags be blue or yellow? Well the order of prioririty goes that the more specific attribute gets higher priority. Hence because we specified that all p tags within a body is blue is more specific than any p tag anywhere in html so our text will be blue.  However if we had a p tag outside the body as you might guess it's color will be red.

The basic syntax of CSS is 
	selector {property: value; [property: value; ...]}
One can chain various selectors to become more specific about which element we are referring to. This process of chaining is also called cascasding hence the C in CSS.


Now that we've read a little bit about CSS let's use them. There are two ways to incorporate this style sheet into our web page.

First we can put it directly into our index.html file like so.

{% highlight HTML %}
<!DOCTYPE html>

<style type="text/css">
body p {color:blue}
p {
	color:red;
	background-color: rgb(255, 255, 128); 
	text-align: center;
}
</style>

<body>
	<p>Hello World</p>
</body>
</html>
{% endhighlight %}

The only thing new here is the incorporation of the style tag `<style type="text/css"> </style>`.  

The preferred method however is to have another file with the css as a suffix such as filename.css. In that file we will put all of our styling information and then the two files will look like this.


this file will be called mystyle.css
{% highlight CSS %}
body p {color:blue;}
p {
	color:red;
	background-color: rgb(255, 255, 128); 
	text-align: center;
}
{% endhighlight %}

this file is still called index.html
{% highlight HTML %}
<!DOCTYPE html>

<link rel="stylesheet" type="text/css" href="mystyle.css">

<body>
	<p>Hello World</p>
</body>
</html>
{% endhighlight %}


This looks familiar because it is almost exactly the same as what's the above css example. You don't need any extra titles or anything of the sort for the mystyle.css file.  The only other thing to note is that I combined the two p selectors from the first one into one p selector here to make it cleaner.

That's it on CSS for now.

For more on CSS notation see this or go to extra resources at the end of the page  
[CSS notation](https://learnxinyminutes.com/docs/css/)


## Just Javascript

In this section I will go over some of the basics of javascript language itself and how it interacts with html and CSS.

For this part we are going to move away from the sublime for a little bit.  We are going to work with an interactive session that we can write our javascript code and afterwards come back to sublime to save it. 

Open up Firefox or Chrome and press Ctrl + Shift + I.  This will open up the developer tools and will get us an interactive session called a console for us to play around with.

Once you have your console up let's begin with a short code example.

{% highlight Javascript %}
// This is a comment
console.log("Hello Javascript :)")  // console.log basically printf
1 + 1
Infinity + 1
Infinity + NaN 
true + 1
"123" == 123 
"123" === 123
var x = 1

{% endhighlight %}

Javascript also has arrays and objects.  Array elements can be of any type, and can be changed. Objects represent a map or like a python dictionary and are denoted with {}.
You can add to both of them like so. 

{% highlight Javascript %}
myArray = ["Steven"] 
myArray[1] = 2;
myObj = {"1":11,"2":111}
myObj[2] = 222
myObj.Howdy = "Partner" //An alternative way to add

{% endhighlight %}

Finally a little example of a loop and a function:

{% highlight Javascript %}
count = 0
while (count < 5)
{
	count += 1
}

myObj = {"1":11,"2":111,"Steven":"TA"}
myObj[2] = 222
myObj.Howdy = "Partner"

for (var x in myObj) {
	console.log(x);
}

var study = function() 
{
	console.log("All theory and no play makes UChicago student");
}
study()
{% endhighlight %}

Now that we've seen some Javascript let's see how we can incorporate it into our html example.

{% highlight HTML %}
<!DOCTYPE html>
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
<body>
	<p>Hello World</p>
	<button onclick="myFunction()">Click me</button>
	<script> myFunction = function() {alert("I am an alert box!");} </script>
</body>
</html>
{% endhighlight %}

Here we did a few things we added back the `<head>` tag because most of the you'd want the other files to be loaded first. The other two things that have been added are a button and the script.

We can do it without the button and still create the popup box like so.

	<p onclick="myFunction()">Hello World</p>

Here it doesn't look like anything has changed but you can now click on Hello World and it'll create the popup box.

Lastly the better way to load in the javascript is to put the javascript in the in it's file with the .js extension then load it in the html like so.  

{% highlight HTML %}
<!DOCTYPE html>
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
<script src="path/to/myscript.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
	<p>Hello World</p>
	<button onclick="myFunction()">Click me</button>
</body>
</html>
{% endhighlight %}

Here the myFunction has been moved to the myscript.js and it is loaded before hand.  

Now that we know a few things about Javascript let's have a little bit of fun.

#### Fun Example  
Having fun with 2048. Remember that game? We are going to mess around with it a bit using javascript.

Go to https://gabrielecirulli.github.io/2048/ then you can copy and paste the code below to mess around with it automatically.


{% highlight Javascript %}
var manager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
u = manager.move(0);  // up
r = manager.move(1);  // right
d = manager.move(2);  // down
l = manager.move(3);  // left

for (var i = 0; i < 10; i+=1)
{
	d();
	r();
}
{% endhighlight %}

For a slightly more in depth look at javascript you can look at [javascript][javascriptquick].  


## Debugging

Like any code not written by super human or Linus Torvalds it will eventually break and when it does you'd like to be ready to debug it. 

So how do we debug our javacript code?

Go to Ctrl + Shift + I in the Browser and you can then view the folder layout in sources then click on the javascript file.  Here each web browser gives you it's slight variation for how to add in a breakpoint for example.  Right click on the line you think is giving you trouble then click add a breakpoint.  Now once the code stops there you can perform single stepping and use the console to examine all the contents of the local variables.  

I'll expand more on debugging at a later time.  Feel free to refer to [Firefox Debugging](https://developer.mozilla.org/en-US/docs/Tools). Chrome has similar tools but I've found firefox to be a bit better.  (This could very well change as of writing this.)


## D3: Doing Debugging Done

Alright we are almost there. Know that we know a bunch of the basics how do we add d3 to our webpages?

Visit https://d3js.org/ and download the d3.zip file.  Unzip it. Take our previous example and add this line as an element to the header tag like so:

{% highlight HTML %}
<!DOCTYPE html>
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
<!-- <script src="path/to/d3.v3.js" charset="utf-8"></script>  
this is a comment and an alternative way to load d3-->
</head>
<body>
	<p>Hello World</p>
	<button onclick="myFunction()">Click me</button>
</body>
</html>
{% endhighlight %}

Here we changed the script to load in the d3 from the website the first script tag.  Your webpage can call other sources online to load in d3! but if you want to use your own local version of d3 change the src to point to the folder where you unzipped it.  

There are many tutorials on using d3 [tutorials](https://github.com/mbostock/d3/wiki/Tutorials)

I'll go over [this one](http://thinkingonthinking.com/Getting-Started-With-D3/)

{% highlight HTML %}
<!DOCTYPE html>
<head>
	<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script type="text/javascript" >
		function todo() {

		var vis = d3.select("#graph")
	            .append("svg");
		vis.text("The Graph")
	        .select("#graph");
	    var nodes = [{x: 30, y: 50},
	              {x: 50, y: 80},
	              {x: 90, y: 120}];
	    vis.selectAll("circle .nodes")
	     .data(nodes)
	     .enter()
	     .append("svg:circle")
	     .attr("class", "nodes")
	     .attr("cx", function(d) { return d.x; })
	     .attr("cy", function(d) { return d.y; });
	    vis.selectAll("circle .nodes")
	      .data(nodes)
	      .enter()
	      .append("svg:circle")
	      .attr("class", "nodes")
	      .attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; })
	      .attr("r", "10px")
	      .attr("fill", "black");
		}
	</script>
</head>

<body onload="todo()">
	<div id="graph">
	</div>
	<p onclick="myFunction()">Hello World</p>

</body>
</html>
{% endhighlight %}

to run it type todo() in the console.

## Extra Resources

W3schools and mozilla developers network (MDN) are good resources for much of the above material.  
[HTML](http://www.w3schools.com/html/default.asp)  
[HTML dev guide](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML)  
[CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)  
[Javascript Quick Reference][javascriptquick]  
[Javascript In Depth](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  



[javascriptquick]: https://learnxinyminutes.com/docs/javascript/


