---
layout: post
title:  "Adventures in Torch"
date:   2016-03-01 12:00:00
categories: torch update
---


For starters some of the basics about Torch.  Torch is a machine learning (more appropriately a neural network) library written in Lua. Lua's syntax is somewhat similar to python (without the forced tabs), while it only contains one abstract container type that of a table. Lua tables are hashmaps and can be thought of to function in a similar way to javascripts prototypes.  For more on Lua one can check out this link [Learn_Lua][Lua]. 


Some examples of what you can quickly do in Torch:

{% highlight lua %}
require 'nn' 
model = nn.Sequential()
model:add(nn.SpatialConvolution(3, 1, 3, 3, 1, 1, 1, 1)) 
model:add(nn.ReLU())
model:add(nn.Dropout())
model:add(nn.Linear(256*256, 20))
model:add(nn.Sigmoid())

{% endhighlight %}

A bit more about lua/torch.  All variables all global unless specified with local. The ":" operator passes in the variable as the first argument to the function. So model:add() will pass model as the first argument to add followed by the the next parameter which could be the nn.sigmoid function for example.  It's similar to python in that the first parameter passed in when creating an objects is the "self" parameter. 

So this "simple" model will run a convolution that takes in an image (not necessarily an image but makes it easier to visualize) of  inputdimension 3 (think RGB), outputs dimension 1,  filter size is 3 x 3, step size is 1 in both horizontal and vetical and lastly is the zero padding of 1 on all sides of the image.  Those are all the specified parameters for the convolution.

The next layer will take as input the convolution run it through a relu followed by dropout, then a linear layer before finally squashing all of the results into a sigmoid function.  For the linear layer I assumed the size of the image is 256*256 and the output that we want is 20 classes (think PASCAL VOC).  

Actually using the model is quite nice and easy once it's set up.

{% highlight lua %}
output = model:forward(inputs)

{% endhighlight %}

Where inputs is a table of the input images you want to pass through the model.

One needs to specify a loss function (in torch they are called criterion). Then pass in the output of the model and the associated ground truth labels.

{% highlight lua %}
f = criterion:forward(output, targets);

df_doutput = criterion:backward(output, targets);
{% endhighlight %}

Finally one can run backpropagation through the model given the associated derivatives.


{% highlight lua %}
model:backward(inputs, df_do);

{% endhighlight %}



The torch docs on github are quite good for most modules in my opinion. You can check it out [Torch Docs][thDocs].  It only becomes a little bit confusing once you ever need to use nn.Concat vs nn.ConcatTable vs nn.Parallel as the descriptions of what they actually do could be improved in my opinion.

Torch itself is quite beautiful and in my opinion the main thing holding it back is Lua.  Many times the error will not actually tell you where the program crashed and I'm looking for a debugger that could maybe alleviate this situation.  The other thing to nitpick is that of one based indexing.  It messes up the beauty of using the modulo function when one needs to wrap around values and then index into a table by always needing to add one. 


In a followup post I'm going to work on creating a new layer in Torch.



[Lua]: https://learnxinyminutes.com/docs/lua/
[thDocs]: https://github.com/torch/nn/blob/master/doc/index.md