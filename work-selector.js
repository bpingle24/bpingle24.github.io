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
          { type: "p", text: "Applying this process with a discharge coefficient of 0.60 yields a required upstream pressure of 36.13 bar for the oxygen manifold and 24.41 bar for the methane manifold to sustain our stiffness and mass flow requirements in nominal operation." },
	  { type: "h4", text: "Nozzle Design" },
	  { type: "p", text: "Proper nozzle design is critical in capturing the maximum thrust potential of an RDRE, and optimizing for the unsteady nature of the exhaust flow is a major design challenge. Fortunately, RDREs like DEIMOS have a unique annular chamber geometry that enables us to implement an aerospike plug nozzle naturally. For those that are unfamiliar, an aerospike nozzle is a type of plug nozzle that has a passively-variable expansion ratio, which means it is optimal for a wide range of chamber-to-ambient pressure ratios. This generally doesn't matter for test-stand articles that won't see altitude changes, but our test campaign expects changes in equivalence ratios as an independent variable of study. Changing propellant mixture ratios will change our chamber pressure, and if not passively compensated, our nozzle efficiency (thrust coefficient) will also change, creating a performance dependency. The aerospike nozzle ensures an isolated independent variable in our test campaign that conventional fixed-expansion nozzles cannot."},
	  { type: "p", text: "The Method of Characteristics (MoC) is a mathematical technique that transforms the governing hyperbolic equations of steady supersonic flow into ordinary differential equations along characteristic lines, enabling the calculation of full flow-field properties. I will use this technique to develop a minimum length aerospike nozzle. (Refer to ****PROJECT**** for a full derivation of a simplified method as a demonstration). The aerospike contour was generated by implementing Angelino's approximate plug-nozzle design method, discretizing the expansion into a series of annular streamtubes (frustums) to numerically construct the surface."},
	  { type: "h4", text: "[Angelino, G. (1964). Approximate Method for Plug Nozzle Design. AIAA Journal, 2(10), 1834–1835. https://doi.org/10.2514/3.2682]."},
	  { type: "p", text: "Necessary input variables for this process are throat area (\\(A_{t}\\)), average chamber pressure (\\(P_{c}\\)), exit pressure (\\(P_{e}\\)), ratio of specific heats (\\(\\gamma\\)), and an initial geometry correction factor. To obtain the exit Mach number (\\(M_{e}\\)), the Isentropic Pressure-Mach Relation is solved from chamber pressure and exit pressure,"},
	  { type: "eq", tex: "M_e = \\sqrt{\\frac{2}{\\gamma-1}\\left(\\left(\\frac{P_c}{P_e}\\right)^{\\frac{\\gamma-1}{\\gamma}}-1\\right)}"},
	  { type: "p", text: "The expansion ratio is then computed from the area-Mach relation,"},
	  { type: "eq", tex: "\\frac{A_e}{A_t}=\\frac{1}{M_e}\\left(\\frac{2}{\\gamma+1}\\left(1+\\frac{\\gamma-1}{2}M_e^2\\right)\\right)^{\\frac{\\gamma+1}{2(\\gamma-1)}}"},
	  { type: "p", text: "The total Prandtl-Meyer angle (\\(\\nu_{e}\\)) is determined using the Prandtl-Meyer function,"},
	  { type: "eq", tex: "\\nu(M)=\\sqrt{\\frac{\\gamma+1}{\\gamma-1}}\\tan^{-1}\\left(\\sqrt{\\frac{\\gamma-1}{\\gamma+1}(M^2-1)}\\right)-\\tan^{-1}\\left(\\sqrt{M^2-1}\\right)"},
	  { type: "p", text: "which iterates from a Mach number of one at the throat to the determined Mach number at the exit, evaluating the Prandtl-Meyer angle (\\(\\nu\\)) and Mach angle (\\(\\mu\\)) at each step. The Mach angle is given by"},
	  { type: "eq", tex: "\\mu(M)=\\sin^{-1}\\left(\\frac{1}{M}\\right)"},
	  { type: "p", text: "These angles are then used to determine the spike geometry. The nondimensional radius and axial positions are obtained from"},
	  { type: "eq", tex: "\\frac{R_x}{R_e}=\\sqrt{1-\\frac{\\sin(\\nu_e-\\nu_x+\\mu_x)}{\\frac{A_x}{A_t}}\\left(\\frac{2}{\\gamma+1}\\left(1+\\frac{\\gamma-1}{2}M_x^2\\right)\\right)^{\\frac{\\gamma+1}{2(\\gamma-1)}}}"},
	  { type: "eq", tex: "H_x=\\frac{R_e-R_x}{\\tan(\\nu_e-\\nu_x+\\mu_x)}"},
	  { type: "p", text: "The algorithm was implemented in MATLAB using a fine resolution of 400 points. These were imported into Siemens NX, connected with 3rd degree splines, and revolved for a smooth surface generation."},
	  { type: "p", text: "Although it wasn't performed by me directly, the contour was validated with a RANS CFD simulation in ANSYS Fluent. The computed flow field confirms correct nozzle behavior. The exhaust reaches Mach 1 at the throat, indicating a choked flow, and subsequently expands along the spike surface. The centerline Mach number increases smoothly downstream, approaching approximately Mach 3 near the design exit, consistent with the value predicted."}
        ]
      },
      {
        num: "03 | Engineering Application",
        h: "Implementation of Common Practices",
        blocks: [

          { type: "p", text: "Common engineering practices refer to the actions taken by engineers to apply established standards, practices, and commercially available components in their designs. This includes but is not limited to using seals, ports, piping, bolts, and other premanufactured hardware in their products. This section demonstrates my ability to apply engineering standards, technical references, and industry-standard tools to practical rocket design."},
 	  { type: "h4", text: "AS5202 ORB Ports & SAE Standard Dash Sizing"},
	  { type: "p", text: "The Parker O-Ring Handbook is a widely recognized industry reference used extensively for the selection, design, and application of O-ring sealing systems. The image to the right shows the specifications for an O-ring boss (ORB) port under AS5202 standards. I was responsible for implementing all of these ports on the engine for various SAE dash sizes. These ports connect our propellant feed lines to their plenums, the predetonator to the chamber, capillary tube averaged-pressure transducers (CTAPs), and the various infinite tube probes (ITPs) connected to the combustor. "}

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
