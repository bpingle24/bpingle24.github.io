const projectData = {
  deimos: {
    tag: "RDRE - PURPL",
    title: "DEIMOS",
    dek: "Design and analysis of a methane-GOx rotating detonation rocket engine",
    meta: ["CAD", "CFD", "MATLAB"],
    img: "assets/deimos-hardware.png",
    sections: [
      {
        num: "01 | Summary",
        h: "Summary",
        p: [
          "The Purdue Undergraduate Rocket Propulsion Lab (PURPL) rotating detonation engine (RDE) subteam has two engines - a hydrogen-air combustor, HADES, and a methane-oxygen combustor, DEIMOS. My contributions were nearly exclusive to DEIMOS, the RDRE.",
          "From its conception, I've played a leading role in nearly all areas of the engine's design. The current development has followed conceptual, preliminary, and critical design reviews to a published design paper in AIAA's Region III Student Conference. Manufacturing is planned throughout the Fall 2026 semester, ready just in time for our winter hot-fire campaign.",
          "Technical design decisions required extensive knowledge of compressible flow dynamics, shock-expansion theory, thermodynamics, combustion fundamentals, and much more. The highlights below represent selected contributions and are not an exhaustive account of my work on the project."
        ]
      },
      {
        num: "02 | Hardware Design",
        h: "Hardware Design",
        p: [
          "Content"
        ]
      },
      {
        num: "03 | Modeling & Analysis",
        h: "Modeling & Analysis",
        p: [
          "Content"
        ]
      },
      {
        num: "04 | Engineering Application",
        h: "Engineering Application",
        p: [
          "Content"
        ]
      }
    ]
  },
  toolbox: {
    tag: "Subheader",
    title: "Title",
    dek: "Content",
    meta: ["Meta", "Meta", "Meta"],
    img: "assets/placeholder.png",
    sections: [
      {
        num: "01 / Section",
        h: "Subheader",
        p: [
          "Content"
        ]
      }
    ]
  },
  moc: {
    tag: "Subheader",
    title: "Title",
    dek: "Content",
    meta: ["Meta", "Meta", "Meta"],
    img: "assets/placeholder.png",
    sections: [
      {
        num: "01 / Section",
        h: "Subheader",
        p: [
          "Content"
        ]
      }
    ]
  },
  bib: {
    tag: "Subheader",
    title: "Title",
    dek: "Content",
    meta: ["Meta", "Meta", "Meta"],
    img: "assets/placeholder.png",
    sections: [
      {
        num: "01 / Section",
        h: "Subheader",
        p: [
          "Content"
        ]
      }
    ]
  }
};

function renderProjectSections(sections) {
  return sections.map(function (s) {
    var html = '<div class="case-section"><div class="case-section-num">' + s.num + '</div><h2>' + s.h + '</h2>';
    html += s.p.map(function (p) { return '<p>' + p + '</p>'; }).join('');
    if (s.ul) {
      html += '<ul>' + s.ul.map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</ul>';
    }
    if (s.callout) {
      html += '<div class="callout"><div class="callout-label">' + s.callout.label + '</div><p>' + s.callout.text + '</p></div>';
    }
    html += '</div>';
    return html;
  }).join('');
}

document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.roster-item');
  var focusPane = document.getElementById('focus-pane');
  var focusBody = document.getElementById('focus-body');

  if (!items.length || !focusPane || !focusBody) return;

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      items.forEach(function (i) { i.classList.remove('active'); });
      item.classList.add('active');
      var d = projectData[item.dataset.id];
      if (!d) return;
      document.getElementById('focus-img').src = d.img;
      document.getElementById('focus-tag').textContent = d.tag;
      document.getElementById('focus-title').textContent = d.title;
      document.getElementById('focus-dek').textContent = d.dek;
      document.getElementById('focus-meta').innerHTML = d.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('');
      focusBody.innerHTML = renderProjectSections(d.sections);
      focusPane.scrollTop = 0;
    });
  });

  focusBody.innerHTML = renderProjectSections(projectData.deimos.sections);
});

// Specs panel — show only for DEIMOS, hide for others
(function () {
  function updateSpecs(projectId) {
    var specsEl = document.getElementById('focus-specs');
    if (!specsEl) return;
    if (projectId === 'deimos') {
      specsEl.classList.remove('hidden');
    } else {
      specsEl.classList.add('hidden');
    }
  }

  // Patch the existing click handlers after DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    // Initial state: deimos is active so specs visible
    updateSpecs('deimos');

    var items = document.querySelectorAll('.roster-item');
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        updateSpecs(item.dataset.id);
      });
    });
  });
})();
