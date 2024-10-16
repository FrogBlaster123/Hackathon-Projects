document.addEventListener("DOMContentLoaded", function () {
  const postForm = document.getElementById("post-form");
  const discussionFeed = document.getElementById("discussion-feed");
  const weatherMoodTags = document.getElementById("weather-mood-tags");

  let posts = [];
  let selectedMood = "";

  function createPost(title, content, weatherMood) {
    const post = {
      id: Date.now(),
      title,
      content,
      weatherMood,
      date: new Date(),
      comments: [],
    };
    posts.unshift(post);
    renderPosts();
  }

  function createComment(postId, content) {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      post.comments.push({
        id: Date.now(),
        content,
        date: new Date(),
      });
      renderPosts();
    }
  }

  function getWeatherIcon(mood) {
    const icons = {
      sunny: "fa-sun",
      rainy: "fa-cloud-rain",
      cloudy: "fa-cloud",
      stormy: "fa-bolt",
      snowy: "fa-snowflake",
    };
    return icons[mood] || "fa-cloud";
  }

  function renderPosts() {
    discussionFeed.innerHTML = "";
    posts.forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.style.animationDelay = `${index * 0.1}s`;
      postElement.innerHTML = `
              <div class="post-header">
                  <h3 class="post-title">${post.title}</h3>
                  <span class="post-date">${formatDate(post.date)}</span>
              </div>
              <span class="weather-mood-tag ${post.weatherMood}">
                  <i class="fas ${getWeatherIcon(post.weatherMood)}"></i>
              </span>
              <p class="post-content">${post.content}</p>
              <div class="comments">
                  ${post.comments
                    .map(
                      (comment) => `
                      <div class="comment">
                          <span class="comment-author">Anonymous</span>
                          <span class="comment-date">${formatDate(
                            comment.date
                          )}</span>
                          <p>${comment.content}</p>
                      </div>
                  `
                    )
                    .join("")}
              </div>
              <form class="comment-form" data-post-id="${post.id}">
                  <input type="text"   placeholder="Add a comment" required>
                  <button type="submit"><i class="fas fa-comment"></i></button>
              </form>
          `;
      discussionFeed.appendChild(postElement);
    });
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  weatherMoodTags.addEventListener("click", function (e) {
    if (e.target.classList.contains("weather-tag")) {
      selectedMood = e.target.dataset.mood;
      document.querySelectorAll(".weather-tag").forEach((tag) => {
        tag.classList.remove("active");
      });
      e.target.classList.add("active");
    }
  });

  postForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    if (!selectedMood) {
      alert("Please select a weather mood");
      return;
    }
    createPost(title, content, selectedMood);
    postForm.reset();
    selectedMood = "";

    document.querySelectorAll(".weather-tag").forEach((tag) => {
      tag.classList.remove("active");
    });

    // Scroll to the top of the discussion feed to see the new post
    discussionFeed.scrollTop = 0;
  });

  discussionFeed.addEventListener("submit", function (e) {
    if (e.target.classList.contains("comment-form")) {
      e.preventDefault();
      const postId = parseInt(e.target.dataset.postId);
      const content = e.target.querySelector("input").value;
      createComment(postId, content);
      e.target.reset();
    }
  });

  // Add some initial posts for demonstration
  createPost(
    "Mumbai",
    "The long-awaited monsoon has finally hit Mumbai. Streets are getting flooded, but the air feels fresh!",
    "rainy"
  );
  createPost(
    "Delhi",
    "Temperature soars to 45°C in Delhi. Stay hydrated and avoid going out if possible.",
    "sunny"
  );
  createPost(
    "Bangalore",
    "It's a pleasant day in Bangalore with overcast skies. Perfect weather for a cup of coffee!",
    "cloudy"
  );

  // Initial render
  renderPosts();
});
