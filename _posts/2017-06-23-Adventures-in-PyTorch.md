---
layout: post
title:  "Adventures in PyTorch"
date:   2017-06-23 12:00:00
categories: pytorch update
---

This page is being updated and as such is in an incomplete state at the moment.

Brief Intro:
I went from using Torch, to Tensorflow, and now Pytorch.  For some time I used lasagne while I coded in Tensorflow as lasagne tended to give me improved performance compared to Tensorflow.

#### Why Pytorch

There are several reasons why one should choose to learn pytorch.  Here are my main reasons:

1. Debugging is much simpler in a dynamic computation framework
2. They are providing really good tools for the community (such as torchvision)
3. Dynamic are much better than static for development
4. Builtin GPU support
5. It's faster by default

I'll expand a bit more on the points below.

For my work I need to be able to iterate quickly to create models and also change them quickly to be able to run multiple experiments.  Being able to quickly debug is essential as it really helps in the process of quick iteration.  By having dynamic graphs I can see where in the graph my error has occurred perhaps some of the tensors shapes are not aligned or I have a bad input type at some point in the graph.  
Sometimes these errors can be caught at compile time with other frameworks but there others that happen at runtime and with compiled models the errors I've encountered are almost unintelligible.

Sometimes using the tool is not just about the tool itself.  It's about the community surrounding the tool that allows it to become prolific.  With torch it took a while to understand some of the inner workings as the documentation was quite poor unless you built the model or worked on it already.  Pytorch's documentation is a bit better but that could also be because I already went through a lot of the muck of torch that I now better understand some of the inner workings.  
Other niceties that I've found with pytorch is that individuals actually share their pre-trained models whereas I have found it much less common in tensorflow for some reason. Lastly facebook is creating a github repo that collects many of the standard datasets and organizes them in once place.  In this way with one pip install you can have access to all of the standard datasets and also preprocessing becomes much easier instead of writing your own for every dataset you encounter.

Having the capability to alter your graph at runtime or via a conditional statement is a really big deal in terms of the expressiveness of the model.  This hasn't really been taken advantage of because the ideas for how to properly update a changing model itself do not exist yet that I know of.  It still gives much greater freedom to design and redisign your model at any model unlike static computation graphs.

The built in GPU support is a nice convenient feature that many modern tools currently have that is able to speed up processing time by over an order of magnitude in some circumstances.

This last point is a bit odd for me as I feel like in theory the static graphs should be faster.  My belief in this is that by knowing that the graph is static one could apply more optimizations that one could not do with a dynamic graph.  In practice though Pytorch seems to be one of the fastest if not the fastest computation graph library that is available.  This could be attributed to a few things.  The main of which is that the compilers for the static graphs aren't very smart at the moment so the extra benefits and savings that could be happening aren't.  The other is that there might be some mistakes the other languages are performing since they usually rely on Nvidia to handle the gpu computation with their propreitary code anyways there might not be much performance improvements that could be gained with a static graph.

#### What's still lacking

Granted it is still in early beta as of July 2017 so it can be forgiven for some of the missing features.  However if you need to use these already it is not a good time to start otherwise you'll encounter a few headaches along the way.

One thing that still needs work is indexing.
You can only use fancy indexing along a tensors first dimension

Second is for recurrent models.
The ability to use masking is missing for the loss and is confusing for the inputs.  Ideally it would be best to provide an api that could encode the sequences correctly. Currently one has to sort the inputs from longest along the first dimension and pad the remaining dimensions with zero and then convert it to packed_padded_sequence.  Finally the loss does not handle feeding in a mask so one has to resort to weird hacks that may break in the future.

Accessing submodules needs some attention as well if you want to use a pretrained model and get the output of a certain layer takes some work.  


There are more and this page will be updated with more information soon.

<!-- Table testing

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |



Some examples of what you can quickly do in Torch:

{% highlight python %}
require 'nn'
model = nn.Sequential()
model:add(nn.SpatialConvolution(3, 1, 3, 3, 1, 1, 1, 1))
model:add(nn.ReLU())
model:add(nn.Dropout())
model:add(nn.Linear(256*256, 20))
model:add(nn.Sigmoid())

{% endhighlight %} -->
