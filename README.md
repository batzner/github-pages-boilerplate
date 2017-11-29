# github-pages-boilerplate

Ready-to-fork setup of Babel, Gulp and Jekyll for GitHub Pages. [Showcase / Blog post](https://theblog.github.io/post/jekyll-github-pages-gulp-babel-directory-structure/) about this repo.

## Usage
1. Fork the repo
2. Run <code>npm install</code> in the root directory to install Gulp and Babel locally.
3. Run <code>gulp jekyll</code> to build the site with Babel and serve it with Jekyll afterwards. Visit <a href="http://localhost:4000" target="_blank">http://localhost:4000</a> to see the blog.</li>
</ol>


## Development
The <code>master</code> branch should only be used for deploying (see considerations below). For development, switch to the <code>dev</code> branch. After implementing your changes, test them by running <code>gulp jekyll</code> and visiting <a href="http://localhost:4000" target="_blank">http://localhost:4000</a>

If you are happy, checkout the <code>master</code> branch, merge the <code>dev</code> branch, run <code>gulp</code> to build the site into the project's root directory and push / deploy the new build to the <code>master</code> branch on GitHub.

Note: You can skip Babel during development by changing <code>source: _dist</code> to <code>source: src</code> and running <code>jekyll serve</code> in the root directory.

## Considerations
* Running Babel for transpiling the ES6 files into ES5 before each deployment of the site is not practical, so a build tool like Gulp that runs Babel automatically is a must.
* There is a <a href="https://github.com/babel/jekyll-babel" target="_blank">jekyll-babel Jekyll plugin</a> but you have to start each .js file with exactly
        <pre><code>---<br>---</code></pre>
        WebStorm does not like that and formats it wrongly every time. If you try to escape that block with <code>// @formatter:off</code>, the Jekyll plugin won't work anymore. Also, it is a bit dirty to mess with the .js files. If I want to directly run them during development, they will error. So, Babel has to be called by Gulp.
* Babel will generate the transpiled .js files somewhere. I don't want these files to mingle with the actual source .js files - that would cause confusion. So, using a <code>src</code> and a <code>_dist</code> directory (ignored by git) would be clean. Jekyll can then generate the static site in <code>_site</code> by using the files in <code>_dist</code>.
* You have to commit all files that Jekyll needs to the <code>master</code> branch on GitHub. So <code>_dist</code> must not be ignored by git. At the same time it is generated code so it should be ignored. A solution is to ignore <code>_dist</code> on the <code>dev</code> branch. Then, merge the <code>dev</code> branch to the <code>master</code> branch, run Gulp and push the newly <code>_dist</code> to the GitHub <code>master</code> branch.
* For running Jekyll on the <code>_dist</code> directory, you would have to specify <code>source: _dist</code> in Jekyll's <code>_config.yml</code>. However, GitHub overrides the <code>source</code> setting, which you cannot change (<a href="https://help.github.com/articles/configuring-jekyll/#configuration-settings-you-cannot-change" target="_blank">GitHub docs</a>). So Jekyll's source directory <strong>has to be the repo's top level directory</strong> (for username.github.io pages). You also <strong>must</strong> commit the page to the <code>master</code> branch. The solution is to keep the <code>source: _dist</code> setting for the <code>dev</code> branch, but let gulp build the site into the root directory on the <code>master</code> branch (<a href="https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/" target="_blank">docs</a>).


## Drawbacks

* On <code>master</code>, Gulp cannot clean the build directory before building because it is the project's root directory.
* You have to go to <code>master</code>, build and push for every deployment of the site. <a href="https://github.com/shinnn/gulp-gh-pages">This gulp plugin</a> might help with that.
* On <code>master</code>, I had to change <code>_config.yml</code> and <code>gulpfile.js</code> to make Gulp build into the root directory. Thus, changes to these files in <code>dev</code> will have to be merged manually with master.

