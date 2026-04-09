"use client";
import { useState } from 'react';

export default function ClientPage({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItemImage, setSelectedItemImage] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-slate-700 relative">
      
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-xl font-light tracking-[0.2em] text-white uppercase">CLR Industrial Trading</h1>
          <div className="hidden lg:flex items-center space-x-8">
            <span className="text-sm font-light text-slate-400">📧 clr.industrial@gmail.com</span>
            <span className="text-sm font-light text-slate-400">📞 0962.5309982</span>
            <a href="#contact" className="bg-white text-slate-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-slate-200 transition-colors duration-300">
              Request Quote
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section 
          className="py-32 md:py-48 px-6 text-center flex flex-col items-center justify-center relative"
          style={{
            backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.95)), url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-slate-400 uppercase mb-4 block relative z-10">Premium Distribution</span>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-8 max-w-4xl leading-tight relative z-10">
            Elevating standards in industrial equipment.
          </h2>
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mb-12 leading-relaxed relative z-10">
            Supplying the Philippines with enterprise-grade construction, welding, and safety equipment. Built for scale, delivered with precision.
          </p>
        </section>

        {/* PRODUCT PORTFOLIO SECTION */}
        <section className="py-24 bg-slate-950 px-6 border-t border-slate-800 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-5xl md:text-6xl font-light tracking-tight text-white">Product Portfolio</h3>
              <div className="w-16 h-px bg-slate-600 mx-auto mt-8"></div>
              <p className="mt-8 text-slate-400 font-light text-lg">Select a category to view our available equipment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              
              {categories.map((category) => (
                <div 
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className="cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-500 hover:shadow-2xl hover:shadow-slate-800/50 transition-all duration-500 overflow-hidden group flex flex-col"
                >
                  <div className="relative overflow-hidden bg-slate-800 flex items-center justify-center h-56 border-b border-slate-800">
                    {category.coverImage ? (
                      <img src={category.coverImage} alt={category.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    ) : (
                      <span className="text-slate-500 font-light tracking-widest text-sm uppercase">Empty Category</span>
                    )}
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all duration-500"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h4 className="text-lg font-semibold uppercase tracking-widest text-white mb-4 group-hover:text-slate-300 transition-colors">{category.title}</h4>
                    <p className="text-slate-400 font-light text-sm mb-2 flex-grow whitespace-pre-wrap leading-relaxed text-justify">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>
      </main>

      {/* POPUP CATEGORY INVENTORY (First Modal) */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer" onClick={() => setSelectedCategory(null)}></div>
          
          <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            <div className="p-8 md:p-10 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-light tracking-tight text-white">{selectedCategory.title}</h2>
              </div>
              <button onClick={() => setSelectedCategory(null)} className="text-white hover:text-slate-400 bg-slate-800 hover:bg-slate-700 rounded-full w-12 h-12 flex items-center justify-center transition-colors">✕</button>
            </div>

            <div className="p-8 md:p-10 bg-slate-950 flex-grow">
              {selectedCategory.totalItems === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-xl">
                  <p className="text-slate-500 text-lg font-light mb-2">No items listed yet.</p>
                  <p className="text-slate-600 text-sm">Add images (.png/.jpg) inside this category folder to see them here.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  
                  {selectedCategory.sections.map((section, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-light text-white mb-6 border-b border-slate-800 pb-3">{section.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {section.items.map((item) => (
                          <div key={item.id} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-600 transition-colors group">
                            
                            <div className="relative cursor-pointer overflow-hidden" onClick={() => setSelectedItemImage(item)}>
                              <img src={item.imagePath} alt={item.id} className="w-full h-64 object-cover border-b border-slate-800 group-hover:opacity-75 transition-opacity duration-300" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <span className="bg-black/80 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">Enlarge Image</span>
                              </div>
                            </div>
                            
                            <div className="p-6">
                              <p className="text-slate-300 font-light leading-relaxed whitespace-pre-wrap text-justify">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ENLARGED PURE IMAGE POPUP (Second Modal) */}
      {selectedItemImage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-10">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer" onClick={() => setSelectedItemImage(null)}></div>
          
          <button 
            onClick={() => setSelectedItemImage(null)} 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white bg-slate-800/80 hover:bg-red-600 rounded-full w-14 h-14 flex items-center justify-center transition-colors shadow-2xl border border-slate-600 z-20 text-2xl cursor-pointer"
            title="Go Back"
          >
            ✕
          </button>
          
          <div className="relative z-10 flex justify-center items-center pointer-events-none">
            <img 
              src={selectedItemImage.imagePath} 
              alt="Enlarged view" 
              className="max-h-[85vh] max-w-[95vw] object-contain rounded-md shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto" 
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="bg-black text-slate-500 py-24 border-t border-slate-900 relative z-30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h1 className="text-xl font-light tracking-[0.2em] text-slate-300 uppercase mb-6">CLR Industrial Trading</h1>
            <p className="font-light leading-relaxed max-w-sm mb-12 text-slate-600">Setting the benchmark for industrial distribution in the Philippines.</p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Direct Lines</h3>
                <p className="font-light text-slate-300 mb-1">0962.5309982</p>
                <p className="font-light text-slate-300 mb-1">0961.7024485</p>
                <p className="font-light text-slate-300">0954.4954797</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Online</h3>
                <p className="font-light text-slate-300 mb-1">clr.industrial@gmail.com</p>
                <p className="font-light text-slate-300">www.clrindustrial.com</p>
              </div>
            </div>
            <p className="text-xs tracking-widest uppercase text-slate-800">© 2026 CLR Industrial Trading.</p>
          </div>

          <div className="bg-slate-900 p-8 md:p-10 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-light tracking-tight text-white mb-6">Request a Custom Quote</h3>
            
            {/* THIS IS THE UPDATED FORM - REPLACE THE LINK ON THE NEXT LINE */}
            <form action="https://formspree.io/f/mreovbgj" method="POST" className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                <input type="text" name="Client Name" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-slate-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
                <input type="email" name="Client Email" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-slate-500" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Project Details</label>
                <textarea name="Project Details" rows="4" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-slate-500" placeholder="Tell us about the tools you need..."></textarea>
              </div>
              <button type="submit" className="w-full bg-white text-slate-900 font-semibold uppercase tracking-widest text-sm py-4 rounded-lg hover:bg-slate-200">
                Send Message
              </button>
            </form>

          </div>

        </div>
      </footer>

    </div>
  );
}