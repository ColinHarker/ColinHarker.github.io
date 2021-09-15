---
layout: post
title:  "Creating my Webpage with Jekyll"
date:   2015-11-25 22:18:57
categories: jekyll github
---

In case anyone is curious as to how I made my webpage I'll detail the process below.  It's hosted for free on github and you can look at the [source code](https://github.com/xksteven/xksteven.github.io) if you want to borrow any parts of my css or layout configurations.

Note that most of the instructions work for both OSX and GNU/Linux machines because I use a Linux machine myself.  There's a bit more work that will be required on windows but it still is doable.

#### What is Jekyll?

Jekyll is a tool that helps making websites easier by creating some infrastructure that will perform some linking and creation magic so you don't have to.  That's what Jekyll is to me.

In the words of the Jekyll developers:
Jekyll is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through a converter (like Markdown) and our Liquid renderer, and spits out a complete, ready-to-publish static website suitable for serving with your favorite web server. Jekyll also happens to be the engine behind GitHub Pages, which means you can use Jekyll to host your project’s page, blog, or website from GitHub’s servers for free.

Here, [Jekyll Home Page](https://jekyllrb.com/docs/home/) is their webpage for all the official guides and documentation.

#### What's required

* Ruby
* RubyGems
* Github account (free)
* git

#### Getting Started

Make a new github repo with the repo name username.github.io (replace username with your github username).  Clone the directory somewhere on your machine.  

Install Jekyll with `gem install jekyll bundler`

This part is for themes and rss feed `gem install minima jekyll-feed` (required for easy setup)

Open a terminal and cd into the github repo.

Run the command `jekyll new .` if that fails you may need to run `jekyll new . --force`

#### Jekyll layout structure

The new jekyll comes with the default theme called minima.  You can see where it is on your computer with `bundle show minima`.

The folder contents should now include

* \_posts
* index.md
* about.md
* \_config.yml
* Gemfile
* Gemfile.lock

The important pages to know about here are the \_posts directory and index.md.  The index.md is your main markdown page that will greet users coming from the web.  The \_posts directory is where all of your blog posts will go in.  It even has an example post already there.

#### Running Jekyll

To view the webpage locally modify in \_config.yml the url variable to "localhost:4000".

Now start up Jekyll from the root of the github repo with `jekyll serve --watch`

Open up your favorite web browser and in the address bar go to localhost:4000

You should see your webpage.

#### Your first post

All of the posts are written in markdown.  It's a nice and convenient way to add style directly in the files.

Good markdown resources [daring fireball](https://daringfireball.net/projects/markdown/syntax) and [mastering markdown](https://guides.github.com/features/mastering-markdown/).

#### Putting your website online

Change the website url to username.github.io (replace username with your github username).

commit and push your changes to the repo.

`git add --all .`
`git commit -m "new webpage"`
`git push`

And that's it.  You might need to wait a few minutes before your webpage becomes visible online.
