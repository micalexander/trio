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
  `trio init -m `
  
#### Wordpress

After you install your desired theme. In the root of our wordpress project run:
  `trio init -w [theme-folder-name]`
  
#### Other

After you install your desired theme. In the root of our wordpress project run:
  `trio init
  
### Output Folder Structure
Work out of the folders prefixed with an underscore and serve the other folders to the browser.

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
