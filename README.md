# 11ty-wordpress-permalinks

WordPress-esque yyyy/mm/slug permalinks in Eleventy.

## WHY

Because maybe you want your permalinks to be WordPress compatible, like so:

```yaml
permalink: "{{ yyyy }}/{{ mm }}/{{ pageSlug }}/"
```

## HOW

All of our "posts" are in the /src/posts/ folder, so we can set a directory level permalink using a data file named [/src/posts/posts.json](src/posts/posts.json), with the following sauce:

```js
"permalink": "/{{ page.date | permalink_year }}/{{ page.date | permalink_month }}/{{ page.fileSlug }}/"
```

Then, we need two custom filters in our .eleventy.js config file:

```js
// Option 1: Separate filters for year/month.
// USAGE:
//   "permalink": "/{{ page.date | permalink_year }}/{{ page.date | permalink_month }}/{{ page.fileSlug }}/"
eleventyConfig.addFilter("permalink_year", dateObj => dateObj.getFullYear());
eleventyConfig.addFilter("permalink_month", dateObj =>
  String(dateObj.getMonth() + 1).padStart(2, "0")
);
```

But, maybe that's a bit wordy and you dont want to pass the year/month/slug separately.

Instead, we can modify the [/src/posts/posts.json](src/posts/posts.json) with the following permalink structure:

```js
"permalink": "{{ page | post_permalink }}"
```

And then add a new filter that accepts a page object and returns the year, month, and slug path string:

```js
// Option 2: Single filter for year/month/slug.
// USAGE:
//   "permalink": "{{ page | post_permalink }}"
eleventyConfig.addFilter("post_permalink", page => {
  const yyyy = page.date.getFullYear();
  const mm = String(page.date.getMonth() + 1).padStart(2, "0");
  return `${yyyy}/${mm}/${page.fileSlug}/`;
});
```

Now when you run <kbd>npm run build</kbd> you should see something similar to the following, which writes the posts to something like www/2020/02/my-first-post/index.html;

```sh
npm run build

> 11ty-wordpress-permalinks@1.0.0 build /Volumes/Dev/github/pdehaan/11ty-wordpress-permalinks
> eleventy

Writing www/2020/02/hello-world/index.html from ./src/posts/hello-world.njk.
Writing www/2020/02/my-first-post/index.html from ./src/posts/my-first-post.njk.
Wrote 2 files in 0.24 seconds (v0.10.0)
```
