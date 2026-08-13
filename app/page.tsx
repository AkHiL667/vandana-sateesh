'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Compass, Heart, MapPin, Music2, Pause, Play, Sparkles } from 'lucide-react'

const petals = [
  { left: '8%', delay: '0s', duration: '13s' },
  { left: '22%', delay: '3s', duration: '16s' },
  { left: '47%', delay: '7s', duration: '14s' },
  { left: '72%', delay: '1s', duration: '17s' },
  { left: '88%', delay: '5s', duration: '15s' },
]

const confetti = [
  { left: '8%', color: 'gold', delay: '.1s' }, { left: '17%', color: 'pink', delay: '.28s' },
  { left: '28%', color: 'green', delay: '.44s' }, { left: '40%', color: 'gold', delay: '.2s' },
  { left: '55%', color: 'pink', delay: '.36s' }, { left: '67%', color: 'green', delay: '.52s' },
  { left: '79%', color: 'gold', delay: '.18s' }, { left: '91%', color: 'pink', delay: '.32s' },
] as const

function Ornament({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`ornament ${className}`}>✦　❧　✦</div>
}

function Envelope({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  return (
    <section className={`envelope-stage ${opened ? 'is-open' : ''}`} aria-label="Open your invitation">
      <div className="petal-field" aria-hidden="true">
        {petals.map((petal, index) => <span key={index} className="petal" style={petal} />)}
      </div>
      <div className="envelope-copy">
        <p className="eyebrow">A wedding invitation</p>
        <h1>For two hearts,<br /><em>one beautiful beginning.</em></h1>
        <p className="envelope-hint">Tap the seal to open</p>
      </div>
      <div className="party-burst" aria-hidden="true">
        {confetti.map((piece, index) => <span key={index} className={`confetti confetti-${piece.color}`} style={{ left: piece.left, animationDelay: piece.delay }} />)}
        <span className="burst-star burst-star-one">✦</span><span className="burst-star burst-star-two">✧</span><span className="burst-star burst-star-three">✦</span>
      </div>
      <button className="envelope-button" onClick={onOpen} aria-label="Open the wedding invitation">
        <div className="paper-card"><span>With love</span><strong>V <Heart aria-hidden="true" size={22} fill="currentColor" /> S</strong></div>
        <div className="envelope-body" />
        <div className="envelope-flap" />
        <div className="wax-seal"><Heart aria-hidden="true" size={25} fill="currentColor" /></div>
      </button>
      <p className="scroll-note">A celebration of love · 28 August 2026</p>
    </section>
  )
}

function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  return (
    <button className="music-toggle" onClick={() => setPlaying(!playing)} aria-pressed={playing} aria-label={playing ? 'Pause music' : 'Play music'}>
      {playing ? <Pause size={15} /> : <Play size={15} />} <span>{playing ? 'Pause' : 'Music'}</span>
    </button>
  )
}

export default function Home() {
  const [opened, setOpened] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!opened) return
    const timer = window.setTimeout(() => setActive(true), 1100)
    return () => window.clearTimeout(timer)
  }, [opened])

  useEffect(() => {
    if (!active) return
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view')
    }), { threshold: 0.14 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [active])

  return (
    <main className={`invitation-shell ${active ? 'has-revealed' : ''}`}>
      <Envelope opened={opened} onOpen={() => setOpened(true)} />
      <div className={`invitation-content ${active ? 'visible' : ''}`}>
        <div className="celebration-ribbons" aria-hidden="true"><i>✿</i><i>❀</i><i>✿</i><i>❀</i><i>✽</i><i>✿</i></div>
        <div className="floating-tools"><MusicToggle /><a href="#details" aria-label="Skip to wedding details"><ChevronDown size={17} /></a></div>
        <section className="hero section-pad">
          <div className="hero-sparkles" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span><span>✧</span></div>
          <p className="eyebrow reveal">Together with their families</p>
          <div className="hero-monogram reveal"><span>V</span><Heart size={23} fill="currentColor" /><span>S</span></div>
          <h2 className="hero-title reveal">S. Vandana <i>&amp;</i><br /> V. Satish</h2>
          <Ornament className="reveal" />
          <p className="hero-date reveal">28 <span>·</span> 08 <span>·</span> 2026</p>
          <p className="hero-subtitle reveal">Invite you to share in the joy<br />of their wedding celebration</p>
          <a className="down-link reveal" href="#details">Discover the celebration <ChevronDown size={16} /></a>
        </section>

        <section id="details" className="sage-panel section-pad reveal">
          <div className="section-label">The invitation</div>
          <p className="large-quote">“Two souls, one heart,<br /><em>and a lifetime to go.”</em></p>
          <div className="family-line"><span>Daughter of</span><strong>Smt. Suddamalla Aruna<br />&amp; Late Sri Suddamalla Prabhakar Naidu</strong></div>
          <Heart className="tiny-heart" size={16} fill="currentColor" />
          <div className="family-line"><span>Son of</span><strong>Smt. Vaddi Shobha<br />&amp; Late Sri Vaddi Subbarao</strong><small>Venkatagiri Mandal, Tirupati District</small></div>
        </section>

        <section className="story section-pad">
          <div className="section-label">A new chapter</div>
          <h3 className="section-title reveal">The beginning<br /><em>of forever.</em></h3>
          <div className="story-copy reveal"><span className="story-mark">V <i>&amp;</i> S</span><p>We found something rare in each other — a home, a friendship, and a promise worth making. With the blessings of our families, we are stepping into our next chapter together.</p></div>
          <Ornament className="reveal" />
        </section>

        <section className="events dark-panel section-pad" id="events">
          <div className="section-label light reveal">Mark your calendar</div>
          <h3 className="section-title light reveal">A day to<br /><em>remember.</em></h3>
          <div className="event-grid">
            <article className="event-card reveal"><div className="event-icon"><Sparkles size={20} /></div><p className="event-type">Reception &amp; Dinner</p><h4>Friday, 28 August</h4><p>6:30 PM onwards</p></article>
            <article className="event-card reveal"><div className="event-icon"><Heart size={20} /></div><p className="event-type">Muhurtam</p><h4>Friday, 28 August</h4><p>Night 10:50 – 11:55</p><small>Shubha Vrushaba Lagna</small></article>
          </div>
        </section>

        <section className="venue section-pad reveal">
          <div className="section-label">Join us at</div><MapPin className="venue-pin" size={25} /><h3 className="section-title">SRL Convention<br /><em>Hall</em></h3><p>H.P. Petrol Bunk Prakasam<br />Tirupati Road, Venkatagiri</p><a className="map-link" href="https://www.google.com/maps/search/SRL+Convention+Hall+Venkatagiri" target="_blank" rel="noreferrer"><Compass size={16} /> View on map</a>
        </section>

        <footer className="closing section-pad"><Ornament /><p className="eyebrow">We would love to celebrate with you</p><h3>We can&apos;t wait to<br /><em>celebrate with you.</em></h3><div className="footer-monogram">V <Heart size={17} fill="currentColor" /> S</div><p className="footer-date">28 · 08 · 2026</p></footer>
      </div>
    </main>
  )
}
