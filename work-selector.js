const projectData = {
  deimos: {
    tag: "RDRE / PURPL",
    title: "DEIMOS",
    dek: "A methane-GOx rotating detonation rocket engine, built around a variable impinging injector and an aerospike contour sized to its detonation cell width.",
    meta: ["1,350 N", "3.875\" OD", "AIAA 2026"],
    img: "assets/deimos-wireframe.png",
    sections: [
      {
        num: "01 / Overview",
        h: "Why DEIMOS exists",
        p: [
          "DEIMOS is PURPL's methane-GOx rotating detonation rocket engine — a continuously-rotating detonation wave replaces conventional deflagrative combustion, which in principle recovers pressure gain that a standard rocket chamber simply throws away. The catch is that almost nothing about a detonation chamber behaves like a standard one: injector response time, wall heat flux, and nozzle expansion all have to be re-derived around a wave that's circling the annulus at several kilohertz.",
          "My work on the sub-team covered two of those pieces directly: the injector layout that has to survive and re-fill behind that wave, and the aerospike nozzle that has to expand a flow with a circumferentially-varying pressure field instead of a clean, uniform one."
        ]
      },
      {
        num: "02 / Injector",
        h: "A variable impinging injector layout",
        p: [
          "The injector has to do two things that are somewhat in tension: meter propellant precisely enough to hold a stable mixture ratio, and re-fill the annulus fast enough to keep up with a detonation wave that returns to the same circumferential location dozens of times a millisecond. We used a variable impinging element layout — element spacing and impingement angle tuned around the annulus rather than held uniform — to manage local fill fraction and mixing quality without over- or under-feeding any one region of the chamber."
        ],
        ul: [
          "Sized orifice geometry against target mass flux and momentum ratio for stable impingement",
          "Iterated element spacing against predicted fill-region length from the performance model",
          "Carried mixture ratio margin to keep the design tolerant of injector-to-injector manufacturing variation"
        ]
      },
      {
        num: "03 / Nozzle",
        h: "Aerospike contour design",
        p: [
          "A conventional bell nozzle assumes a roughly uniform inlet condition. An RDE doesn't give you one — pressure and temperature vary around the annulus depending on where the detonation wave currently is. An aerospike geometry is far more tolerant of that nonuniformity and continues to expand reasonably well off-design, which made it the natural fit downstream of the chamber.",
          "I led the contour design, sizing the spike against the chamber's predicted exit conditions and detonation cell width so the nozzle's expansion characteristics stayed matched to the engine actually feeding it, rather than to an idealized uniform inlet."
        ]
      },
      {
        num: "04 / Modeling",
        h: "Closing the loop with performance prediction",
        p: [
          "Injector and nozzle decisions were both made against predicted performance rather than intuition — fill-region length, expected wave speed, and exit conditions all came from the quasi-1D performance model I built in parallel (see the RDE performance toolbox project). That let geometry choices on DEIMOS get checked against a model before committing to hardware, instead of the other way around."
        ]
      },
      {
        num: "05 / Outcome",
        h: "Where it stands",
        p: [
          "DEIMOS and the design work behind it were published through AIAA Region III. The engine continues to move through PURPL's test campaign, with injector and nozzle iterations feeding back into the performance model as hotfire data comes in."
        ],
        callout: {
          label: "Status",
          text: "Hardware design complete; integration and test campaign ongoing with the PURPL DEIMOS sub-team."
        }
      }
    ]
  },
  toolbox: {
    tag: "MATLAB / Modeling",
    title: "RDE performance toolbox",
    dek: "A quasi-1D performance model combining Shepherd & Kasahara pressure decay with Stechmann's temporal framework, validated against published hotfire data.",
    meta: ["MATLAB", "c*, Cf, Isp(t)", "In progress"],
    img: "assets/toolbox-diagram.svg",
    sections: [
      {
        num: "01 / Overview",
        h: "Why build a performance model from scratch",
        p: [
          "Designing engine hardware like DEIMOS means predicting performance before metal is cut — chamber pressure decay, characteristic velocity, thrust coefficient, and specific impulse all need an estimate that geometry decisions can be checked against. Off-the-shelf rocket performance tools assume steady deflagrative combustion; an RDE's chamber pressure is anything but steady, so I built a quasi-1D model specific to the detonation cycle instead of adapting a tool that wasn't meant for it."
        ]
      },
      {
        num: "02 / Structure",
        h: "Combining two frameworks",
        p: [
          "The model couples two pieces of prior work rather than inventing the physics from nothing: Shepherd & Kasahara's pressure decay relation governs how chamber pressure evolves behind the detonation front, and Stechmann's temporal framework provides the time-resolved structure needed to track that decay through a full cycle rather than just at a single instant."
        ],
        ul: [
          "Pressure-decay relation sets the instantaneous chamber state behind the wave",
          "Temporal framework propagates that state through the fill, detonation, and blowdown portions of the cycle",
          "Cycle-averaged c* and Cf are integrated out of the resulting pressure-time history",
          "Isp(t) is recovered from c* and Cf rather than assumed from a steady-state correlation"
        ]
      },
      {
        num: "03 / Validation",
        h: "Checking it against real hotfire data",
        p: [
          "A model is only useful if it's been checked against something that actually fired. I validated the toolbox's outputs against published RDE hotfire data, comparing predicted c*, Cf, and Isp against measured values across the available test points rather than relying on a single favorable comparison."
        ]
      },
      {
        num: "04 / The gap",
        h: "A systematic Isp overprediction",
        p: [
          "That validation pass surfaced a consistent pattern rather than scattered noise: the model overpredicts specific impulse by roughly 23–45% relative to measured hotfire values, and the size of the gap moves with operating condition instead of sitting at a fixed offset. A fixed-offset error would point to a calibration constant; a condition-dependent one points to a missing physical effect."
        ],
        callout: {
          label: "Working hypotheses",
          text: "Candidates under investigation include unmodeled heat loss through the chamber wall, incomplete combustion efficiency assumptions inherited from the pressure-decay relation, and nozzle expansion losses not captured by the current cycle-averaged Cf treatment."
        }
      },
      {
        num: "05 / Status",
        h: "Where this goes next",
        p: [
          "I'm treating the overprediction as the most useful output of the validation pass, not a flaw to patch over quietly — isolating which term in the cycle-averaged integration is responsible will tell us something real about RDE performance, not just about this model. That investigation is ongoing alongside continued use of the toolbox to inform geometry decisions on DEIMOS."
        ]
      }
    ]
  },
  moc: {
    tag: "Method of characteristics",
    title: "Detonation wave structure solver",
    dek: "A method-of-characteristics solver for the triple-point structure inside an RDE, extending Fievisohn's model to nonzero inflow angle.",
    meta: ["MATLAB", "θ₄ ≠ 0 extension", "In progress"],
    img: "assets/moc-emblem.png",
    sections: [
      {
        num: "01 / Overview",
        h: "What's actually happening inside the wave",
        p: [
          "An RDE's detonation wave isn't a single clean front — it's a small structure made up of an oblique shock, a slipline, a reactant fill layer, and the triple point where they all meet, all of it propagating around the annulus together. Getting chamber-level performance right eventually requires understanding that structure directly rather than treating the wave as a black box, which is what motivated this solver."
        ]
      },
      {
        num: "02 / Background",
        h: "Starting from Fievisohn's model",
        p: [
          "Fievisohn's triple-point model gives a method-of-characteristics description of this structure for the case where flow enters the oblique shock head-on — inflow angle θ₄ equal to zero. It's a strong foundation, but a real RDE doesn't guarantee that head-on condition; fill-layer geometry and upstream flow turning can leave the reactant layer meeting the oblique shock at an angle."
        ]
      },
      {
        num: "03 / Extension",
        h: "Why nonzero θ₄ matters",
        p: [
          "Once θ₄ is allowed to be nonzero, the oblique shock's deflection angle, the slipline orientation, and the triple-point trajectory all shift together — they're coupled through the same shock-jump relations, so you can't perturb one in isolation. Extending the model meant re-deriving the triple-point geometry and shock relations to carry θ₄ as a free parameter rather than assuming it away, and checking that the θ₄ = 0 case still recovers Fievisohn's original solution as a limit."
        ],
        ul: [
          "Re-derived oblique shock jump conditions with general inflow angle",
          "Propagated the resulting deflection through the slipline and fill-layer boundary conditions",
          "Confirmed the extended formulation collapses to the original model at θ₄ = 0"
        ]
      },
      {
        num: "04 / Method",
        h: "Solving it with characteristics",
        p: [
          "The solver uses the method of characteristics to march the flow field through each region of the structure — fill layer, post-shock flow, and the expansion around the triple point — propagating along characteristic lines rather than discretizing the full domain. That keeps the solver fast enough to sweep across θ₄ values and compare resulting wave structures directly."
        ]
      },
      {
        num: "05 / Status",
        h: "Where this stands",
        p: [
          "The extended formulation is implemented and validated against the θ₄ = 0 limit; current work is sweeping nonzero inflow angles to characterize how triple-point trajectory and fill-layer geometry respond, with the goal of feeding that back into the chamber-level assumptions used in the RDE performance toolbox."
        ]
      }
    ]
  },
  bib: {
    tag: "Bibliometrics / DoD",
    title: "US-China tech competition analysis",
    dek: "A tensor-based bibliometric framework for measuring research competition across DoD-priority technology domains, built during an AFIT/ORISE research internship.",
    meta: ["Scopus", "AFIT / WPAFB", "2026"],
    img: "assets/bibliometrics-diagram.svg",
    sections: [
      {
        num: "01 / Overview",
        h: "Measuring research competition, not just output",
        p: [
          "This project came out of a research internship at the Air Force Institute of Technology, working on how the Department of Defense tracks research competitiveness across critical technology domains. Publication counts alone are a weak signal — they say how much a country is publishing, not whether that output is concentrated, accelerating, or shifting between domains. The goal was a framework that could say something about those dynamics directly."
        ]
      },
      {
        num: "02 / Motivation",
        h: "Why DoD-priority domains specifically",
        p: [
          "The Department of Defense tracks a defined set of critical technology domains where US-China research competition has direct strategic relevance. A static snapshot of publication share in those domains misses the more useful question: which domains is a given country's research effort moving toward or away from, year over year, and how does that compare to where the other side is moving."
        ]
      },
      {
        num: "03 / Methodology",
        h: "A keyword × year × country tensor",
        p: [
          "Rather than a flat country-by-domain comparison, I built a three-dimensional tensor — keyword × year × country — from Scopus publication records, so that shifts in research emphasis over time and across domains could be read directly out of the tensor's structure instead of reconstructed from separate cross-tabs."
        ],
        ul: [
          "Pulled and cleaned publication records from Scopus across the DoD-priority domain set",
          "Mapped publications to domain-relevant keyword sets",
          "Constructed the tensor and used it to track year-over-year shifts in research concentration by country and domain"
        ]
      },
      {
        num: "04 / Findings",
        h: "What the structure made visible",
        p: [
          "Structuring the data this way surfaced domain-level trends that a flat publication-count comparison would have flattened out — where research emphasis was concentrating versus spreading, and how that concentration was moving differently across countries and domains over the years covered."
        ]
      },
      {
        num: "05 / Context",
        h: "The internship itself",
        p: [
          "This work was done during a research internship through the Oak Ridge Institute for Science and Education (ORISE) at AFIT, on-site at Wright-Patterson Air Force Base — a different kind of project from the propulsion hardware and modeling work that makes up the rest of this site, but one that sharpened the same instinct: build the framework that actually answers the question, rather than reaching for the nearest existing metric."
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
