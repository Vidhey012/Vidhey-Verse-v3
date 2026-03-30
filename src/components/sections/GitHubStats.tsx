'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function GitHubStats() {
  const { data, error, isLoading } = useSWR('https://api.github.com/users/Vidhey012', fetcher)

  return (
    <section id="github" className="relative py-32 px-6 md:px-20 lg:px-40 bg-bg-void z-10 flex flex-col items-center justify-center border-t border-grid-line overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        
        <div className="w-full md:w-1/2">
            <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider mb-6">
                Live_Telemtry<span className="text-accent-secondary drop-shadow-glow">()</span>
            </h2>
            <p className="font-body text-text-secondary leading-relaxed mb-8 text-lg">
                Establishing direct uplink to GitHub mainframe. Extracting real-time commit data and repository logistics.
            </p>
            
            <div className="bg-bg-surface border border-grid-line p-8 rounded relative overflow-hidden group hover:border-accent-primary transition-colors">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-secondary to-transparent" />
                
                {isLoading && <p className="font-mono text-accent-dim animate-pulse tracking-widest text-sm">FETCHING_TELEMETRY_DATA...</p>}
                {error && <p className="font-mono text-status-error tracking-widest">CONNECTION_REFUSED_OR_RATE_LIMIT</p>}
                
                {data && !data.message && (
                    <div className="grid grid-cols-2 gap-8 font-mono">
                        <div>
                            <p className="text-[10px] text-text-muted tracking-[0.2em] mb-1">NODE_ID</p>
                            <p className="text-xl text-accent-primary drop-shadow-glow">@{data.login}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-text-muted tracking-[0.2em] mb-1">PUBLIC_REPOS</p>
                            <p className="text-xl text-white">{data.public_repos}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-text-muted tracking-[0.2em] mb-1">FOLLOWERS</p>
                            <p className="text-xl text-white">{data.followers}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-text-muted tracking-[0.2em] mb-1">LOCATION</p>
                            <p className="text-sm text-white mt-1 uppercase">{data.location || 'UNKNOWN SECTOR'}</p>
                        </div>
                    </div>
                )}
                {data && data.message && (
                    // GitHub API rate limit reached fallback
                    <p className="font-mono text-status-warning tracking-widest uppercase">[{data.message}]</p>
                )}
            </div>
            
            <div className="mt-8 flex gap-4 font-mono text-xs text-text-muted tracking-widest">
                 <span className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" /> UPLINK_SECURE
                 </span>
            </div>
        </div>
        
        {/* Decorative Grid Right */}
        <div className="w-full md:w-1/2 h-full flex justify-center items-center opacity-30 pointer-events-none">
             <div className="w-[300px] h-[300px] border-4 border-double border-accent-secondary/50 rounded-full animate-[spin_40s_linear_infinite] flex items-center justify-center">
                 <div className="w-[220px] h-[220px] border border-dashed border-accent-primary/80 rounded animate-[spin_10s_linear_reverse_infinite]" />
             </div>
        </div>
      </div>
      
      {/* Absolute visual noise */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent-primary/5 to-transparent pointer-events-none z-0" />
    </section>
  )
}
