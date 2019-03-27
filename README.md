# github-pages-boilerplate

Ready-to-fork setup of Babel, Gulp and Jekyll for GitHub Pages. [Showcase / Blog post](https://theblog.github.io/post/jekyll-github-pages-gulp-babel-directory-structure/) about this repo.

## Usage
1. Fork the repo
2. Run `npm install` in the root directory to install Gulp and Babel locally.
3. Run `npx gulp jekyll` to build the site with Babel and serve it with Jekyll afterwards. Visit <a href="http://localhost:4000" target="_blank">http://localhost:4000</a> to see the blog.


## Development
The `master` branch should only be used for deploying (see considerations below). For development, switch to the `dev` branch. After implementing your changes, test them by running `npx gulp jekyll` and visiting <a href="http://localhost:4000" target="_blank">http://localhost:4000</a>

If you are happy, checkout the `master` branch, merge the `dev` branch, run `npx gulp` to build the site into the project's root directory and push / deploy the new build to the `master` branch on GitHub.

Note: You can skip Babel during development by changing `source: _dist` to `source: src` and running `jekyll serve` in the root directory.

## Considerations
* Running Babel for transpiling the files for browsers before each deployment of the site is not practical, so a build tool like Gulp that runs Babel automatically is a must.
* There is a <a href="https://github.com/babel/jekyll-babel" target="_blank">jekyll-babel Jekyll plugin</a> but you have to start each .js file with exactly
  ```
  ---
  ---
  ```
  WebStorm does not like that and formats it wrongly every time. If you try to escape that block with `// @formatter:off`, the Jekyll plugin won't work anymore. Also, it is a bit dirty to mess with the .js files. If I want to directly run them during development, they will error. So, Babel has to be called by Gulp.
* Babel will generate the transpiled .js files somewhere. I don't want these files to mingle with the actual source .js files - that would cause confusion. So, using a `src` and a `_dist` directory (ignored by git) would be clean. Jekyll can then generate the static site in `_site` by using the files in `_dist`.
* You have to commit all files that Jekyll needs to the `master` branch on GitHub. So `_dist` must not be ignored by git. At the same time it is generated code so it should be ignored. A solution is to ignore `_dist` on the `dev` branch. Then, merge the `dev` branch to the `master` branch, run Gulp and push the newly `_dist` to the GitHub `master` branch.
* For running Jekyll on the `_dist` directory, you would have to specify `source: _dist` in Jekyll's `_config.yml`. However, GitHub overrides the `source` setting, which you cannot change (<a href="https://help.github.com/articles/configuring-jekyll/#configuration-settings-you-cannot-change" target="_blank">GitHub docs</a>). So Jekyll's source directory **has to be the repo's top level directory** (for username.github.io pages). You also **must** commit the page to the `master` branch. The solution is to keep the `source: _dist` setting for the `dev` branch, but let gulp build the site into the root directory on the `master` branch (<a href="https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/" target="_blank">docs</a>).


## Drawbacks

* On `master`, Gulp cannot clean the build directory before building because it is the project's root directory.
* You have to go to `master`, build and push for every deployment of the site. [This gulp plugin](https://github.com/shinnn/gulp-gh-pages) might help with that.
* On `master`, I had to change `_config.yml` and `gulpfile.js` to make Gulp build into the root directory. Thus, changes to these files in `dev` will have to be merged manually with master.

