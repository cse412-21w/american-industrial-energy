# Final Project: American Industrial Energy
## Team Members
Isaac Kretzmer, Hartmut Frenzel, Janice Kim, Griffin Reichmuth
### Contribution Statements
#### Isaac: 
Team Leader, conceived the project. Downloaded, wrangled, and visualized all
energy data.

#### Hartmut: 
Downloaded, wrangled, and visualized all climate change
related data; wrote text for web pages; contributed to narrated text
for the video.

#### Janice: 
Contributed to narrated text for the video; produced
the video.

#### Griffin: 
In charge of the HTML/CSS. Also performed data exploration on
possible correlations between energy use and air quality (dropped from
final web pages).

## Project Proposal Abstract
Our project is motivated by the increasingly urgent issue of climate change.
First we show historical trends of carbon dioxide emissions and concentrations
in the atmosphere and global temperatures along with projections for
the rest of the 21st century.
Then we take a detailed look at the production and consumption of energy
in the American economy. We show the energy use by county,
the locations of all power plants,
the energy sources and which sectors depend on which energy sources,
and finally the change in energy sources over the last decade. 

## Picture sources in order of appearance

[Earth](http://www.abudhabi2.com/uae-residents-to-observe-earth-hour-on-saturday/)
[Banff](https://i.huffpost.com/gen/4417962/images/o-BANFF-CANADA-facebook.jpg)
[Nuclear](https://e360.yale.edu/features/why-nuclear-power-must-be-part-of-the-energy-solution-environmentalists-climate)
[Windmills](https://upload.wikimedia.org/wikipedia/commons/e/e0/Wind_power_plants_in_Xinjiang%2C_China.jpg)
[Power_lines](http://blogs.law.columbia.edu/climatechange/files/2014/09/electrical-power-lines.jpg)
[Solar](http://www.businessworldghana.com/wp-content/uploads/2014/03/solar-panel.jpg)
[Hydroelectric](https://www.stimson.org/wp-content/files/hydropower.jpg)
[Natural_gas](https://i.huffpost.com/gen/593361/images/o-NATURAL-GAS-FLARE-facebook.jpg)
[Coal](https://www.usnews.com/cmsmedia/c7/61/7cdcfcff4e2b8f4377f0893b3fc5/161215-coal-stock.jpg)
[Redwoods](https://earth911.com/wp-content/uploads/2015/02/redwoods.jp)


## Getting Started

This repo is set up to use the [Parcel](https://parceljs.org/) bundler. If you don't
like the way we've set things up, feel free to change it however you like! You are welcome to add, delete, rename, and replace any files contained here. You may also style and organize your final webpage however you would like. 

The only restriction is that __your final HTML/CSS/JS output must be stored in the "docs" folder__ so that
GitHub knows how to serve it as a static site.
### Install
#### Required software

You must have Node.js installed. You can get it directly from
https://nodejs.org/en/.

#### Install dependecies

Once you've got `node`, run the command `npm install` in this project folder
and it will install all of the project-specific dependencies (if you're curious open up `package.json` to see where these are listed).

npm is the _node package manager_.

### Local development
Notice that the repository is setup with 3 folders: `src/`, `static/`, and `docs/`.

`src/` is where all of your HTML/CSS/JS files should go. Feel free to add sub-folders to divide CSS and JavaScript files.

`static/` is where you can place your data files. The Parcel static file plugin has been installed,
so any files you put in the `static/` folder will be available over the network. See [this guide](https://gist.github.com/mathisonian/46eed3e6102888ddf741829fbbe262ff) for more information on loading data.

`docs/` is the folder that contains the bundled HTML/CSS/JS that you will serve to your final public project site. See below for a more detailed explanation.


### Running the local dev server

To run the project locally, run `npm start` and it will be available at http://localhost:1234/. When the server is running, any local change that you make will be detected by Parcel and your webpage will auto-update with the new changes. Your local changes will not be visible to your team members until you push the changes to your repository. These changes will not be reflected in the final website unless you run the build script and push the updated docs folder (see below).

### Building the final output

Run `npm run build` and all of your assets will be compiled and placed into the `docs/` folder. Note
that this command will overwrite the existing docs folder. You do not have to manually create the `docs/` folder because everything will be handled in the build script. Parcel will bundle all assets in the `src/` folder and place then in a folder called `dist/`. GitHub Pages requires the folder name to be called `docs/`, so we move all assets from the `dist/` folder to the `docs/` folder for you. 

If you are developing on a Windows machine, replace the `build` script in the `package.json` file with this:
`parcel build src/index.html --no-minify --public-url https://cse412-21w.github.io/project-demo & RD /S /Q .\\docs & ren .\\dist docs`

Once pushed to GitHub, the output should be available at https://cse412-21w.github.io/american-industrial-energy/. 
For example, you can view the sample embedded Tableau, vega-lite, and d3 charts at https://cse412-21w.github.io/project-demo/.


## Other notes
### Using 3rd party libraries

You are more than welcome to use open source packages such as D3.js, just make sure to cite these.

To add a new one run `npm install --save <library-name>`, e.g. `npm install --save d3`. This will
add the library locally so it is available for use in your JS files. It will also add `d3` to the
list of dependencies in `package.json`.

_Note that if you install a library your teammates will need to install it too. Once the dependency is added
to `package.json` simply running `npm install` in this directory will download the new dependency._

#### Acknowledgements
This README was adapted from a [template](https://github.com/UW-CSE442-WI20/FP-Template) created by Matthew Conlen for a previous offering of CSE 442.
