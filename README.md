# trio

This gem provides a pretty opinionated folder structure and build system for Middleman and Wordpress as well.

### Dependencies
- Ruby (duh, being that its a ruby gem and all)
- Node

Included:
- Guilp

### Installation

- Download gem to your desktop and unzip it.
- From within your terminal cd into the directory of the unzipped gem.
- Run `gem build trio.gemspec`.
- Run `gem install trio`. 

### Usage

#### Middleman

In the root of our middleman project run:
  `trio init`
  
#### Wordpress

After you install your desired theme. In the root of our wordpress project run:
  `trio init [theme-folder-name]`
  
### Output Folder Structure

```
  trio
    |
    |--_images
    |--_sass
    |--_scripts
    |--css
    |--img
    |--js

```
