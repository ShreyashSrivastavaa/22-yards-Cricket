/**
 * Loading & Error UI Components
 * Used across all pages when fetching live data.
 */
"use client"

import { RefreshCw, AlertTriangle } from "lucide-react"

export function LoadingSkeleton({ rows = 5, label = "Fetching intelligence..." }: { rows?: number; label?: string }) {
    return (
        <div className="space-y-3 py-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary/60 animate-pulse">{label}</div>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="h-8 w-8 rounded bg-muted/30" />
                    <div className="flex-1 space-y-1.5">
                        <div className="h-3 w-3/4 rounded bg-muted/30" />
                        <div className="h-2 w-1/2 rounded bg-muted/20" />
                    </div>
                    <div className="h-6 w-12 rounded bg-muted/20" />
                </div>
            ))}
        </div>
    )
}

export function StatSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-muted/10 border border-muted-foreground/10 animate-pulse">
                    <div className="h-8 w-16 mx-auto rounded bg-muted/30 mb-2" />
                    <div className="h-2 w-12 mx-auto rounded bg-muted/20" />
                </div>
            ))}
        </div>
    )
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
    return (
        <div className="animate-pulse rounded-lg bg-muted/10 border border-muted-foreground/10" style={{ height }}>
            <div className="flex items-center justify-center h-full">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40">
                    Loading visualization...
                </div>
            </div>
        </div>
    )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
            <AlertTriangle className="h-8 w-8 text-rose-500/60" />
            <div className="text-center">
                <div className="text-sm font-mono font-bold text-rose-500">Data temporarily unavailable</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">{message}</div>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-rose-500/30 text-rose-500 text-xs font-mono uppercase hover:bg-rose-500/10 transition-colors"
                >
                    <RefreshCw className="h-3 w-3" /> Retry
                </button>
            )}
        </div>
    )
}
