# trio

This gem provides a pretty opinionated folder structure and build system for Middleman and Wordpress as well.

### Dependencies
- Ruby (duh, being that its a ruby gem and all)
- Node

### Installation

- Run `gem install trio`. 

### Usage

trio needs gulp-cli intalled globally with node in order for it to work.

`npm install gulp-cli -g`

#### Middleman

In the root of our middleman project run:
  `trio init -m `
  
#### Wordpress

After you install your desired theme. In the root of our wordpress project run:
  `trio init -w [theme-folder-name]`
  
#### Other

After you install your desired theme. In the root of our wordpress project run:
  `trio init`
  
### Output Folder Structure
Work out of the folders prefixed with an underscore and serve the other folders to the browser.

```
  trio
    |
    | # input directories
    |--_images
    |--_sass
    |--_scripts
    |
    | # output directories
    |--css
    |--img
    |--js

```
