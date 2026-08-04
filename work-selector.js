const projectData = {
  deimos: {
    tag: "RDRE / PURPL",
    title: "DEIMOS",
    dek: "A methane-GOx rotating detonation rocket engine, built around a variable impinging injector and an aerospike contour sized to its detonation cell width.",
    meta: ["1,350 N", "3.875\" OD", "AIAA 2026"],
    img: "assets/deimos-hardware.png",
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
