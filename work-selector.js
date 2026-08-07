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
        h: "Injector & Nozzle Design",
        blocks: [
          
          { type: "h4", text: "Injector Design" },
          { type: "p", text: "Injector stiffness in rotating detonation engines is often higher than that of constant-pressure combustors. Choking is required for acoustic decoupling of the highly transient combustion environment and the approximately steady-state injector duct. Additionally, RDE injectors are intermittent by construction- high pressure oscillations in the combustion chamber unchoke and reverse flow in the injector ducts, only to return forward flow and subsequent choking after the transient passes. High-stiffness injectors recover from this backflow much faster than low stiffness injectors, which can increase the total propellant flow and overall performance of the engine." },
          { type: "p", text: "The dimensionless injector stiffness is defined as:" },
          { type: "eq", tex: "K_{inj} = \\frac{\\Delta P_{inj}}{P_c}" },
          { type: "p", text: "Where \\(\\Delta P_{inj}\\) is the injector pressure drop and \\(P_c\\) is the average combustion chamber pressure. In combination with mass flow rate requirements, this pressure drop functions as the main constraint in our injector's design. We set a required minimum stiffness of 100% from wave stability measurements in open literature." },
          { type: "p", text: "The pressure drop calculations account for viscous effects in small piping and losses at sharp area changes. I use empirical viscosity models and standard Fanno flow equations since we can expect a sonic exit. The injector choking location is expected to be in the exit area just upstream of the chamber. Thus, the required duct length (\\(L^*\\)) can be set to the actual injector orifice length, and the required input Mach number (\\(M\\)) can be calculated using the Fanno Flow Model." },
          { type: "eq", tex: "\\frac{f_d L^*}{D_h} = \\left(\\frac{1-M^2}{\\gamma M^2}\\right) + \\left(\\frac{\\gamma+1}{2\\gamma}\\right)\\ln\\left(\\frac{M^2}{\\left(\\frac{2}{\\gamma+1}\\right)\\left(1+\\frac{\\gamma-1}{2}M^2\\right)}\\right)" },
          { type: "p", text: "where \\(L^*\\) is the length of the orifice, \\(D_h\\) is the hydraulic diameter, and \\(\\gamma\\) is the ratio of specific heats. The Darcy Friction Factor (\\(f_d\\)) is calculated from the empirical Colebrook-White equation," },
          { type: "eq", tex: "\\frac{1}{\\sqrt{f_d}} = -2\\log\\left(\\frac{\\epsilon}{3.7D_h} + \\frac{2.51}{\\mathrm{Re}\\sqrt{f_d}}\\right)" },
          { type: "p", text: "where \\(\\epsilon/D_h\\) is the relative pipe roughness. Reynolds number was calculated using dynamic viscosity from the Sutherland Model," },
          { type: "eq", tex: "\\mu_d = \\mu_{d,\\mathrm{manifold}}\\left(\\frac{T}{T_{\\mathrm{manifold}}}\\right)^{\\frac{3}{2}}\\frac{T_{\\mathrm{manifold}} + S}{T + S}" },
          { type: "p", text: "Once the inlet Mach number is known, the corresponding static pressure at the injector entrance \\(P_2\\) is determined from the Fanno static pressure relation, taking the chamber pressure as the sonic reference pressure \\(P^*\\)," },
          { type: "eq", tex: "\\frac{P_2}{P^*} = \\frac{1}{M}\\frac{1}{\\sqrt{\\left(\\frac{2}{\\gamma+1}\\right)\\left(1 + \\frac{\\gamma-1}{2}M^2\\right)}}" },
          { type: "p", text: "The upstream manifold stagnation pressure \\(P_{01}\\) must supply the required mass flow while maintaining the computed inlet Mach number. The pressure is therefore obtained from the compressible orifice flow equation," },
          { type: "eq", tex: "\\dot{m} = \\frac{C_D A P_{01}}{\\sqrt{R_g T_0}}\\sqrt{\\frac{2\\gamma}{\\gamma-1}\\left[\\left(\\frac{P_2}{P_{01}}\\right)^{\\frac{2}{\\gamma}} - \\left(\\frac{P_2}{P_{01}}\\right)^{\\frac{\\gamma+1}{\\gamma}}\\right]}" },
          { type: "p", text: "Applying this process with a discharge coefficient of 0.60 yields a required upstream pressure of 36.13 bar for the oxygen manifold and 24.41 bar for the methane manifold to sustain our stiffness requirement in nominal operation." },
	  { type: "h4", text: "Nozzle Design" },
	  { type: "p", text: "Proper nozzle design is critical in capturing the maximum thrust potential of an RDRE, and optimizing for the unsteady nature of the exhaust flow is a major design challenge. Fortunately, RDREs like DEIMOS have a unique annular chamber geometry that enables us to implement an aerospike plug nozzle naturally. For those that are unfamiliar, an aerospike nozzle is a type of plug nozzle that has a passively-variable expansion ratio, which means it is optimal for a wide range of chamber-to-ambient pressure ratios. This generally doesn't matter for test-stand articles that won't see altitude changes, but our test campaign expects changes in equivalence ratios as an independent variable of study. Changing propellant mixture ratios will change our chamber pressure, and if not passively compensated, our nozzle efficiency (thrust coefficient) will also change, creating a performance dependency. The aerospike nozzle ensures an isolated independent variable in our test campaign that conventional fixed-expansion nozzles cannot."},
	  { type: "p", text: "The Method of Characteristics (MoC) is a mathematical technique that transforms the governing hyperbolic equations of steady supersonic flow into ordinary differential equations along characteristic lines, enabling the calculation of full flow-field properties. I will use this technique to develop a minimum length aerospike nozzle. (Refer to ****PROJECT**** for a full derivation of a simplified method). "}
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
    if (s.blocks) {
      html += s.blocks.map(function (b) {
        if (b.type === 'h3') return '<h3>' + b.text + '</h3>';
        if (b.type === 'h4') return '<h4>' + b.text + '</h4>';
        if (b.type === 'eq') return '<div class="equation">\\[' + b.tex + '\\]</div>';
        return '<p>' + b.text + '</p>';
      }).join('');
    } else if (s.p) {
      html += s.p.map(function (p) { return '<p>' + p + '</p>'; }).join('');
    }
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

function renderMathIn(el) {
  if (!el || typeof renderMathInElement !== 'function') return;
  renderMathInElement(el, {
    delimiters: [
      { left: "\\[", right: "\\]", display: true },
      { left: "\\(", right: "\\)", display: false }
    ],
    throwOnError: false
  });
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
      renderMathIn(focusBody);
    });
  });

  focusBody.innerHTML = renderProjectSections(projectData.deimos.sections);
  renderMathIn(focusBody);
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
