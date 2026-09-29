"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, ChevronDown, CreditCard, Wallet, ArrowRight } from "lucide-react";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const footerLinks = {
    explore: [
      { name: "Campaigns", href: "/" },
      { name: "How It Works", href: "/" },
      { name: "Success Stories", href: "/" },
    ],
    involved: [
      { name: "For NGOs & Organizations", href: "/" },
      { name: "For Donors", href: "/" },
      { name: "Need Help? Apply", href: "/" },
      { name: "Get the App", href: "/" },
    ],
    company: [
      { name: "About Us", href: "/" },
      { name: "Trust & Transparency", href: "/" },
      { name: "Contact / Support", href: "/" },
      { name: "FAQs", href: "/" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
      { name: "Donation Refund Policy", href: "/" },
      { name: "Cookie Policy", href: "/" },
    ],
  };

  return (
    <footer className="bg-[#0b291a] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        
        {/* NEWSLETTER ROW */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
          <div className="mb-6 lg:mb-0 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Stay updated on verified causes</h3>
            <p className="text-white/60 text-sm md:text-base">Join our community of changemakers and never miss an update.</p>
          </div>
          <form className="w-full lg:w-auto flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="px-6 py-4 rounded-full bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all w-full sm:w-[300px]"
              required
            />
            <button 
              type="submit" 
              className="bg-[#c0f058] hover:bg-[#b0df48] text-[#0a5228] font-bold px-8 py-4 rounded-full transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* DIVIDER */}
        <hr className="border-white/10 mb-12" />

        {/* 5 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-6 md:gap-x-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10">
                <Image src="/transparent.png" alt="InNeeds Logo" fill className="object-contain brightness-0 invert" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">InNeeds</span>
            </Link>
            <p className="text-white/70 font-normal text-sm mb-2">A new standard for transparent giving.</p>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">We verify, you fund, together we uplift.</p>
            
            <div className="flex items-center gap-4 mb-8">
              <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.45-9.9c0-5.53-4.5-10.02-10-10.02z" /></svg></a>
              <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.85 3.93 2.3 7.15 2.23c1.27-.06 1.64-.07 4.85-.07zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.63 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm5.22-9.42a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg></a>
              <a href="/" className="w-10 h-10 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></a>
            </div>

            <div className="flex gap-3">
              <div className="h-10 px-4 rounded-lg flex items-center justify-center text-[11px] font-semibold border border-white/20 text-white/70 cursor-pointer hover:bg-white/10 hover:text-white transition-colors">App Store</div>
              <div className="h-10 px-4 rounded-lg flex items-center justify-center text-[11px] font-semibold border border-white/20 text-white/70 cursor-pointer hover:bg-white/10 hover:text-white transition-colors">Google Play</div>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="border-b border-white/10 lg:border-none pb-4 lg:pb-0">
            <button className="flex justify-between items-center w-full lg:cursor-default" onClick={() => toggleSection('explore')}>
              <h4 className="text-white/80 uppercase tracking-[0.05em] text-xs font-semibold mb-0 lg:mb-6">Explore</h4>
              <ChevronDown className={`w-5 h-5 lg:hidden transition-transform text-white/50 ${openSection === 'explore' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`mt-4 lg:mt-0 flex-col gap-3 ${openSection === 'explore' ? 'flex' : 'hidden lg:flex'}`}>
              {footerLinks.explore.map((link) => (
                <li key={link.name}><Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div className="border-b border-white/10 lg:border-none pb-4 lg:pb-0">
            <button className="flex justify-between items-center w-full lg:cursor-default" onClick={() => toggleSection('involved')}>
              <h4 className="text-white/80 uppercase tracking-[0.05em] text-xs font-semibold mb-0 lg:mb-6">Get Involved</h4>
              <ChevronDown className={`w-5 h-5 lg:hidden transition-transform text-white/50 ${openSection === 'involved' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`mt-4 lg:mt-0 flex-col gap-3 ${openSection === 'involved' ? 'flex' : 'hidden lg:flex'}`}>
              {footerLinks.involved.map((link) => (
                <li key={link.name}><Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="border-b border-white/10 lg:border-none pb-4 lg:pb-0">
            <button className="flex justify-between items-center w-full lg:cursor-default" onClick={() => toggleSection('company')}>
              <h4 className="text-white/80 uppercase tracking-[0.05em] text-xs font-semibold mb-0 lg:mb-6">Company</h4>
              <ChevronDown className={`w-5 h-5 lg:hidden transition-transform text-white/50 ${openSection === 'company' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`mt-4 lg:mt-0 flex-col gap-3 ${openSection === 'company' ? 'flex' : 'hidden lg:flex'}`}>
              {footerLinks.company.map((link) => (
                <li key={link.name}><Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="pb-4 lg:pb-0">
            <button className="flex justify-between items-center w-full lg:cursor-default" onClick={() => toggleSection('legal')}>
              <h4 className="text-white/80 uppercase tracking-[0.05em] text-xs font-semibold mb-0 lg:mb-6">Legal</h4>
              <ChevronDown className={`w-5 h-5 lg:hidden transition-transform text-white/50 ${openSection === 'legal' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`mt-4 lg:mt-0 flex-col gap-3 ${openSection === 'legal' ? 'flex' : 'hidden lg:flex'}`}>
              {footerLinks.legal.map((link) => (
                <li key={link.name}><Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/40 text-[11px] md:text-xs text-center md:text-left">
            &copy; 2026 InNeeds. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-white/40">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium tracking-wide">Secure payments</span>
            </div>
            <div className="flex items-center gap-3 text-white/40">
              <CreditCard className="w-5 h-5" />
              <Wallet className="w-5 h-5" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
