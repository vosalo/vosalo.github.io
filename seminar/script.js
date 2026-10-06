const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

async function typesetMath() {
  // Wait until the MathJax library has actually loaded.
  while (!window.MathJax?.typesetPromise) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  // Wait until MathJax itself is initialized.
  if (window.MathJax.startup?.promise) {
    await window.MathJax.startup.promise;
  }

  await window.MathJax.typesetPromise([
    document.querySelector('#featured-talk'),
    document.querySelector('#schedule-list')
  ]);
}

const parseLocalDate = value => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const shortDate = value => parseLocalDate(value).toLocaleDateString('en-GB', {
  day: '2-digit', month: 'short'
});

const weekday = value => parseLocalDate(value).toLocaleDateString('en-GB', {
  weekday: 'long'
});

const monthName = value => parseLocalDate(value).toLocaleDateString('en-GB', {
  month: 'short'
});

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderFeatured(talk) {
  const mount = document.querySelector('#featured-talk');
  if (!mount) return;

  mount.replaceChildren();

  if (!talk) {
    mount.append(el('p', 'empty-message', 'No upcoming talks are currently listed.'));
    return;
  }

  const article = el('article', 'featured-talk');
  const dateBox = el('div', 'talk-date');
  dateBox.append(el('span', 'talk-day', String(parseLocalDate(talk.date).getDate()).padStart(2, '0')));
  dateBox.append(el('span', 'talk-month', monthName(talk.date)));

  const main = el('div', 'talk-main');
  main.append(el('div', 'talk-meta', `${weekday(talk.date)} · ${talk.time} · ${talk.room}`));
  main.append(el('h2', '', talk.title));

  const speaker = el('p', 'speaker', talk.speaker);
  if (talk.affiliation) {
	speaker.append(el('span', '', ` · ${talk.affiliation}`));
  }
  main.append(speaker);

  if (talk.abstract) {
    main.append(el('p', 'abstract', talk.abstract));
  }

  if (talk.tags?.length) {
    const tags = el('div', 'tag-row');
    talk.tags.forEach(tag => tags.append(el('span', '', tag)));
    main.append(tags);
  }

  article.append(dateBox, main);
  mount.append(article);
}

function renderSchedule(talks, nextTalk) {
  const mount = document.querySelector('#schedule-list');
  if (!mount) return;

  mount.replaceChildren();

  if (!talks.length) {
    mount.append(el('p', 'empty-message', 'No talks are currently listed.'));
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  talks.forEach(talk => {
    const item = el('article', 'schedule-item');

    const time = el('time', '', shortDate(talk.date));
    time.dateTime = talk.date;

    const details = el('div');

    details.append(el('h3', '', talk.title));

    const speakerLine = talk.affiliation
      ? `${talk.speaker} · ${talk.affiliation}`
      : talk.speaker;

    details.append(el('p', '', speakerLine));
	
	if (
	  talk.abstract &&
	  talk.abstract.trim().toUpperCase() !== 'TBA.' &&
	  talk.abstract.trim().toUpperCase() !== 'TBA' &&
	  parseLocalDate(talk.date) >= today
	) {
	  details.append(
		el('p', 'schedule-abstract', talk.abstract)
	  );
	}

    const isNext = nextTalk && talk.date === nextTalk.date;

    const status = el(
      'span',
      isNext ? 'status next' : 'status',
      isNext ? `Next · ${talk.time}` : talk.time
    );

    item.append(time, details, status);
    mount.append(item);
  });
}

async function loadTalks() {
  const featured = document.querySelector('#featured-talk');
  const schedule = document.querySelector('#schedule-list');

  try {
    const response = await fetch('talks.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
	
	

    const talks = await response.json();
	console.log("Loaded from:", response.url);
	console.log("Talk data:", talks);

    talks.sort((a, b) => a.date.localeCompare(b.date));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
	

    const nextTalk =
      talks.find(talk => parseLocalDate(talk.date) >= today) || null;

    renderFeatured(nextTalk);
    renderSchedule(talks, nextTalk);
	await typesetMath();
	
  } catch (error) {
    console.error('Could not load talks.json:', error);

    featured?.replaceChildren(
      el('p', 'empty-message', 'The talk list could not be loaded.')
    );

    schedule?.replaceChildren(
      el('p', 'empty-message', 'Please check that talks.json is present and valid.')
    );
	console.log(error);
  }
}

loadTalks();
