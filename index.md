---
layout: default
---

# Alexander Chen

<p>
A selection of past projects I've worked on as a mechanical engineer.
</p>

<div class="category-section category-mechatronics">
  <h2>Mechatronics (ME 218 A/B/C @Stanford)</h2>
  
  <div class="project-wrapper">
    <div class="project-card">
      <div class="project-card-content">
        <div>
          <h3 class="project-card-title">Triple Tank Trouble</h3>
          <p class="project-card-description">A time-attack arcade-style minigame, where players manage the fill levels of three steam tanks on a rotating turn table. Developed in 10 days as part of Stanford's ME 218A mechatronics course.</p>
        </div>
        <a href="https://sites.google.com/stanford.edu/me218-3tt/home" class="project-card-link" target="_blank">→ Link to Website</a>
      </div>
      <div class="project-card-image">
        {% include carousel.html items="/assets/images/me218a_img1.png,/assets/images/me218a_img2.jpg,1H_VyXOeG2mYMgp75p5HEsVf0mJ2VLpK7" %}
      </div>
    </div>
  </div>

  <div class="project-wrapper">
    {% include project-card.html 
      title="OverCAD'ed"
      description="A ball-transporting, line-following, competition robot, with a unique focus on its flowery aesthetic. Developed in 3 weeks as part of Stanford's ME 218B mechatronics course."
      image="/assets/images/me218b_img1.png"
      link="https://sites.google.com/view/stanford-2026-me218b-team2/home"
    %}
  </div>

  <div class="project-wrapper">
    {% include project-card.html 
      title="Team✦Init(⚙)"
      description="A critter-collecting pool wader and its compact, gyro-controlled, astrolabe-inspired controller. Developed in 4 weeks as part of Stanford's ME 218C mechatronics course."
      image="/assets/images/me218c_img1.png"
      link="https://sites.google.com/stanford.edu/me218c-init/home"
    %}
  </div>
</div>

<div class="category-section category-robotics">
  <h2>Robotics (ME 314/324 @Stanford)</h2>
  
  <div class="project-wrapper">
    {% include project-card.html 
      title="ME 314 - Robotic Manibulation"
      description="Using Python/ROS to complete four pick-and-place tasks with a 7 DoF robotic manipulator"
      image="/assets/images/me314_img1.png"
      link="https://sites.google.com/stanford.edu/me-314-team-2/home"
    %}
  </div>

  <div class="project-wrapper">
    {% include project-card.html 
      title="ME 326 - Collaborative Robotics"
      description="Using Python/ROS/AI to direct a mobile, bimanual robot to pick up a specified object and bring it to a desired location."
      image="/assets/images/me326_img1.png"
      link="https://sites.google.com/view/collab-robotics-team7/home?authuser=1"
    %}
  </div>
</div>
