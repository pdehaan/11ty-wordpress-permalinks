module.exports = eleventyConfig => {
  // Option 1: Separate filters for year/month.
  // USAGE:
  //   "permalink": "/{{ page.date | permalink_year }}/{{ page.date | permalink_month }}/{{ page.fileSlug }}/"
  eleventyConfig.addFilter("permalink_year", dateObj => dateObj.getFullYear());
  eleventyConfig.addFilter("permalink_month", date =>
    String(date.getMonth() + 1).padStart(2, "0")
  );

  // Option 2: Single filter for year/month/slug.
  // USAGE:
  //   "permalink": "{{ page | post_permalink }}"
  eleventyConfig.addFilter("post_permalink", page => {
    const yyyy = page.date.getFullYear();
    const mm = String(page.date.getMonth() + 1).padStart(2, "0");
    return `${yyyy}/${mm}/${page.fileSlug}/`;
  });

  return {
    dir: {
      input: "src",
      output: "www"
    }
  };
};
