(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime/runtime-types.d.ts" />
/// <reference path="../../../shared/runtime/dev-globals.d.ts" />
/// <reference path="../../../shared/runtime/dev-protocol.d.ts" />
/// <reference path="../../../shared/runtime/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateB.type === 'total') {
        // A total update replaces the entire chunk, so it supersedes any prior update.
        return updateB;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/src/components/NavBar.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NavBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
'use client';
;
function NavBar({ currentPage, onNavigate, username = 'Guest' }) {
    const navLinks = [
        {
            label: 'Home',
            page: 'home',
            icon: 'home'
        },
        {
            label: 'Games',
            page: 'games',
            icon: 'sports_esports'
        },
        {
            label: 'Leaderboard',
            page: 'leaderboard',
            icon: 'leaderboard'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-12 h-20 bg-surface/90 backdrop-blur-xl border-b border-surface-variant",
        style: {
            boxShadow: '0 0 15px rgba(210,187,255,0.1)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onNavigate('home'),
                className: "font-display font-black text-2xl italic text-primary tracking-tighter hover:text-secondary transition-all hover:scale-105",
                children: "TRIVIA-X"
            }, void 0, false, {
                fileName: "[project]/src/components/NavBar.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:flex gap-8",
                children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate(link.page),
                        className: `text-label-lg font-body font-medium uppercase tracking-wide transition-all hover:scale-105 ${currentPage === link.page ? 'text-primary font-bold border-b-2 border-primary pb-0.5' : 'text-on-surface-variant hover:text-secondary'}`,
                        children: link.label
                    }, link.page, false, {
                        fileName: "[project]/src/components/NavBar.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/NavBar.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "text-primary hover:text-secondary transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined",
                            children: "emoji_events"
                        }, void 0, false, {
                            fileName: "[project]/src/components/NavBar.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('profile'),
                        className: `flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all hover:scale-105 ${currentPage === 'profile' ? 'border-primary bg-primary/10' : 'border-surface-variant hover:border-primary/50 bg-surface-container-high'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-7 h-7 rounded-full bg-surface-variant border border-primary/50 flex items-center justify-center text-sm select-none",
                                children: username[0]?.toUpperCase() || 'G'
                            }, void 0, false, {
                                fileName: "[project]/src/components/NavBar.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:block text-label-sm font-mono text-on-surface-variant",
                                children: username
                            }, void 0, false, {
                                fileName: "[project]/src/components/NavBar.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NavBar.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NavBar.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 md:hidden flex bg-surface border-t border-surface-variant z-50",
                children: [
                    navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onNavigate(link.page),
                            className: `flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors ${currentPage === link.page ? 'text-primary' : 'text-on-surface-variant'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined text-xl",
                                    style: {
                                        fontVariationSettings: currentPage === link.page ? "'FILL' 1" : "'FILL' 0"
                                    },
                                    children: link.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NavBar.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-mono uppercase",
                                    children: link.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NavBar.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, link.page, true, {
                            fileName: "[project]/src/components/NavBar.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('profile'),
                        className: `flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors ${currentPage === 'profile' ? 'text-primary' : 'text-on-surface-variant'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-xl",
                                style: {
                                    fontVariationSettings: currentPage === 'profile' ? "'FILL' 1" : "'FILL' 0"
                                },
                                children: "person"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NavBar.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono uppercase",
                                children: "Profile"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NavBar.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NavBar.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NavBar.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NavBar.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = NavBar;
var _c;
__turbopack_context__.k.register(_c, "NavBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/mockData.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_QUESTIONS",
    ()=>ALL_QUESTIONS,
    "GAMES",
    ()=>GAMES,
    "QUIZ_MODES",
    ()=>QUIZ_MODES
]);
const GAMES = [
    {
        id: 'valorant',
        name: 'VALORANT',
        shortName: 'VAL',
        genre: 'Tactical Shooter',
        accentColor: '#ff4655',
        emoji: '🎯',
        description: 'Identify VALORANT agents and maps.'
    },
    {
        id: 'mobile-legends',
        name: 'Mobile Legends',
        shortName: 'MLBB',
        genre: 'Mobile MOBA',
        accentColor: '#00f1fe',
        emoji: '⚔️',
        description: 'Identify MLBB heroes and battlefields.'
    },
    {
        id: 'pokemon',
        name: 'Pokémon',
        shortName: 'PKM',
        genre: 'RPG',
        accentColor: '#e9c400',
        emoji: '⚡',
        description: 'Identify Pokémon species and regions.'
    },
    {
        id: 'league-of-legends',
        name: 'League of Legends',
        shortName: 'LoL',
        genre: 'MOBA',
        accentColor: '#d2bbff',
        emoji: '🏆',
        description: 'Identify LoL champions and maps.'
    },
    {
        id: 'tekken',
        name: 'Tekken',
        shortName: 'TK',
        genre: 'Fighting',
        accentColor: '#ffb4ab',
        emoji: '👊',
        description: 'Identify Tekken fighters and stages.'
    }
];
const QUIZ_MODES = [
    {
        id: 'character-guess',
        name: 'Character Guess',
        description: 'Look at the picture and identify the character.',
        icon: 'person_search',
        timeLimit: 20,
        questionCount: 10
    },
    {
        id: 'map-region',
        name: 'Map / Region / Stage',
        description: 'Identify the map, region, or stage from the picture.',
        icon: 'map',
        timeLimit: 20,
        questionCount: 10
    }
];
// ─── VALORANT Questions ───────────────────────────────────────────────────────
const VALORANT_CHARACTER = [
    {
        id: 'val-c-1',
        gameId: 'valorant',
        type: 'character',
        prompt: 'Who is this VALORANT agent?',
        image: '/images/valorant/agents/jett.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Jett',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Neon',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Reyna',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Phoenix',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-c-2',
        gameId: 'valorant',
        type: 'character',
        prompt: 'Who is this VALORANT agent?',
        image: '/images/valorant/agents/sage.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Skye',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Sage',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Breach',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Killjoy',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-c-3',
        gameId: 'valorant',
        type: 'character',
        prompt: 'Who is this VALORANT agent?',
        image: '/images/valorant/agents/omen.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Viper',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Astra',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Omen',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Harbor',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-c-4',
        gameId: 'valorant',
        type: 'character',
        prompt: 'Who is this VALORANT agent?',
        image: '/images/valorant/agents/reyna.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Reyna',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Neon',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Yoru',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Jett',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-c-5',
        gameId: 'valorant',
        type: 'character',
        prompt: 'Who is this VALORANT agent?',
        image: '/images/valorant/agents/cypher.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Chamber',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Breach',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Cypher',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Gekko',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-c-6',
        gameId: 'valorant',
        type: 'character',
        prompt: 'Who is this VALORANT agent?',
        image: '/images/valorant/agents/sova.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Sova',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Skye',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Fade',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'KAY/O',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-c-7',
        gameId: 'valorant',
        type: 'character',
        prompt: 'Who is this VALORANT agent?',
        image: '/images/valorant/agents/killjoy.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Sage',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Cypher',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Chamber',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Killjoy',
                isCorrect: true
            }
        ]
    },
    {
        id: 'val-c-8',
        gameId: 'valorant',
        type: 'character',
        prompt: 'Who is this VALORANT agent?',
        image: '/images/valorant/agents/viper.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Viper',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Astra',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Brimstone',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Harbor',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-c-9',
        gameId: 'valorant',
        type: 'character',
        prompt: 'Who is this VALORANT agent?',
        image: '/images/valorant/agents/raze.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Neon',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Raze',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Phoenix',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Jett',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-c-10',
        gameId: 'valorant',
        type: 'character',
        prompt: 'Who is this VALORANT agent?',
        image: '/images/valorant/agents/chamber.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Cypher',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Fade',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Chamber',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Sova',
                isCorrect: false
            }
        ]
    }
];
const VALORANT_MAP = [
    {
        id: 'val-m-1',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which VALORANT map is this?',
        image: '/images/valorant/maps/ascent.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Ascent',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Bind',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Haven',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Split',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-m-2',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which VALORANT map is this?',
        image: '/images/valorant/maps/bind.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Fracture',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Bind',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Pearl',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Lotus',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-m-3',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which VALORANT map is this?',
        image: '/images/valorant/maps/haven.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Split',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Breeze',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Haven',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Icebox',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-m-4',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which VALORANT map is this?',
        image: '/images/valorant/maps/icebox.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Breeze',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Icebox',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Ascent',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Sunset',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-m-5',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which VALORANT map is this?',
        image: '/images/valorant/maps/split.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Haven',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Lotus',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Split',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Pearl',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-m-6',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which VALORANT map is this?',
        image: '/images/valorant/maps/pearl.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Sunset',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Breeze',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Fracture',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Pearl',
                isCorrect: true
            }
        ]
    },
    {
        id: 'val-m-7',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which VALORANT map is this?',
        image: '/images/valorant/maps/lotus.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Lotus',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Fracture',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Bind',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Haven',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-m-8',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which VALORANT map is this?',
        image: '/images/valorant/maps/breeze.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Pearl',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Breeze',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Icebox',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Split',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-m-9',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which VALORANT map is this?',
        image: '/images/valorant/maps/sunset.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Lotus',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Bind',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Sunset',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Ascent',
                isCorrect: false
            }
        ]
    },
    {
        id: 'val-m-10',
        gameId: 'valorant',
        type: 'map',
        prompt: 'Which VALORANT map is this?',
        image: '/images/valorant/maps/fracture.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Haven',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Fracture',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Split',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Pearl',
                isCorrect: false
            }
        ]
    }
];
// ─── POKÉMON Questions ────────────────────────────────────────────────────────
const POKEMON_CHARACTER = [
    {
        id: 'pkm-c-1',
        gameId: 'pokemon',
        type: 'character',
        prompt: 'Which Pokémon is this?',
        image: '/images/pokemon/characters/pikachu.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Pikachu',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Raichu',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Jolteon',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Pachirisu',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-c-2',
        gameId: 'pokemon',
        type: 'character',
        prompt: 'Which Pokémon is this?',
        image: '/images/pokemon/characters/charizard.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Dragonite',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Charizard',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Salamence',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Flygon',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-c-3',
        gameId: 'pokemon',
        type: 'character',
        prompt: 'Which Pokémon is this?',
        image: '/images/pokemon/characters/mewtwo.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Mew',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Mewtwo',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Deoxys',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Lugia',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-c-4',
        gameId: 'pokemon',
        type: 'character',
        prompt: 'Which Pokémon is this?',
        image: '/images/pokemon/characters/gengar.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Haunter',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Mismagius',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Gengar',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Banette',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-c-5',
        gameId: 'pokemon',
        type: 'character',
        prompt: 'Which Pokémon is this?',
        image: '/images/pokemon/characters/eevee.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Flareon',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Eevee',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Vaporeon',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Sylveon',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-c-6',
        gameId: 'pokemon',
        type: 'character',
        prompt: 'Which Pokémon is this?',
        image: '/images/pokemon/characters/lucario.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Riolu',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Lucario',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Machamp',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Mienshao',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-c-7',
        gameId: 'pokemon',
        type: 'character',
        prompt: 'Which Pokémon is this?',
        image: '/images/pokemon/characters/snorlax.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Munchlax',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Snorlax',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Blissey',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Wigglytuff',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-c-8',
        gameId: 'pokemon',
        type: 'character',
        prompt: 'Which Pokémon is this?',
        image: '/images/pokemon/characters/umbreon.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Espeon',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Umbreon',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Sylveon',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Leafeon',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-c-9',
        gameId: 'pokemon',
        type: 'character',
        prompt: 'Which Pokémon is this?',
        image: '/images/pokemon/characters/garchomp.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Salamence',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Flygon',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Garchomp',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Dragonite',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-c-10',
        gameId: 'pokemon',
        type: 'character',
        prompt: 'Which Pokémon is this?',
        image: '/images/pokemon/characters/sylveon.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Togekiss',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Gardevoir',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Sylveon',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Florges',
                isCorrect: false
            }
        ]
    }
];
const POKEMON_MAP = [
    {
        id: 'pkm-m-1',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'Which Pokémon region is this?',
        image: '/images/pokemon/regions/kanto.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Kanto',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Johto',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Hoenn',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Sinnoh',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-m-2',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'Which Pokémon region is this?',
        image: '/images/pokemon/regions/johto.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Kanto',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Johto',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Unova',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Kalos',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-m-3',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'Which Pokémon region is this?',
        image: '/images/pokemon/regions/hoenn.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Sinnoh',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Hoenn',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Galar',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Alola',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-m-4',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'Which Pokémon region is this?',
        image: '/images/pokemon/regions/sinnoh.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Johto',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Sinnoh',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Hoenn',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Unova',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-m-5',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'Which Pokémon region is this?',
        image: '/images/pokemon/regions/unova.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Kalos',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Unova',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Galar',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Johto',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-m-6',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'Which Pokémon region is this?',
        image: '/images/pokemon/regions/kalos.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Alola',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Kalos',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Galar',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Paldea',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-m-7',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'Which Pokémon region is this?',
        image: '/images/pokemon/regions/alola.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Kalos',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Alola',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Paldea',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Galar',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-m-8',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'Which Pokémon region is this?',
        image: '/images/pokemon/regions/galar.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Galar',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Paldea',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Alola',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Unova',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-m-9',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'Which Pokémon region is this?',
        image: '/images/pokemon/regions/paldea.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Galar',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Paldea',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Alola',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Kalos',
                isCorrect: false
            }
        ]
    },
    {
        id: 'pkm-m-10',
        gameId: 'pokemon',
        type: 'map',
        prompt: 'Which city is this from Pokémon?',
        image: '/images/pokemon/regions/pallet_town.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Viridian City',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Cerulean City',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Pallet Town',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Lavender Town',
                isCorrect: false
            }
        ]
    }
];
// ─── LEAGUE OF LEGENDS Questions ──────────────────────────────────────────────
const LOL_CHARACTER = [
    {
        id: 'lol-c-1',
        gameId: 'league-of-legends',
        type: 'character',
        prompt: 'Which LoL champion is this?',
        image: '/images/lol/champions/jinx.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Vi',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Jinx',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Caitlyn',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Miss Fortune',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-c-2',
        gameId: 'league-of-legends',
        type: 'character',
        prompt: 'Which LoL champion is this?',
        image: '/images/lol/champions/yasuo.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Yone',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Zed',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Yasuo',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Kayn',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-c-3',
        gameId: 'league-of-legends',
        type: 'character',
        prompt: 'Which LoL champion is this?',
        image: '/images/lol/champions/lux.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Syndra',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Seraphine',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Lux',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Morgana',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-c-4',
        gameId: 'league-of-legends',
        type: 'character',
        prompt: 'Which LoL champion is this?',
        image: '/images/lol/champions/thresh.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Blitzcrank',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Thresh',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Nautilus',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Pyke',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-c-5',
        gameId: 'league-of-legends',
        type: 'character',
        prompt: 'Which LoL champion is this?',
        image: '/images/lol/champions/ahri.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Evelynn',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Ahri',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'LeBlanc',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Zoe',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-c-6',
        gameId: 'league-of-legends',
        type: 'character',
        prompt: 'Which LoL champion is this?',
        image: '/images/lol/champions/teemo.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Rumble',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Kennen',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Teemo',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Tristana',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-c-7',
        gameId: 'league-of-legends',
        type: 'character',
        prompt: 'Which LoL champion is this?',
        image: '/images/lol/champions/vi.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Jinx',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Vi',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Camille',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Fiora',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-c-8',
        gameId: 'league-of-legends',
        type: 'character',
        prompt: 'Which LoL champion is this?',
        image: '/images/lol/champions/zed.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Talon',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Akali',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Zed',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Kayn',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-c-9',
        gameId: 'league-of-legends',
        type: 'character',
        prompt: 'Which LoL champion is this?',
        image: '/images/lol/champions/garen.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Darius',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Jarvan IV',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Garen',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Xin Zhao',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-c-10',
        gameId: 'league-of-legends',
        type: 'character',
        prompt: 'Which LoL champion is this?',
        image: '/images/lol/champions/ezreal.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Taric',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Ezreal',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Twisted Fate',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Corki',
                isCorrect: false
            }
        ]
    }
];
const LOL_MAP = [
    {
        id: 'lol-m-1',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'Which LoL map or location is this?',
        image: '/images/lol/maps/summoners_rift.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: "Summoner's Rift",
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Howling Abyss',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Twisted Treeline',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Crystal Scar',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-m-2',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'Which LoL map or location is this?',
        image: '/images/lol/maps/howling_abyss.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Twisted Treeline',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Howling Abyss',
                isCorrect: true
            },
            {
                id: 'c',
                text: "Summoner's Rift",
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Teamfight Tactics',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-m-3',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'Which LoL region is this?',
        image: '/images/lol/maps/piltover.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Noxus',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Piltover',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Demacia',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Zaun',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-m-4',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'Which LoL region is this?',
        image: '/images/lol/maps/noxus.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Demacia',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Noxus',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Ionia',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Shurima',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-m-5',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'Which LoL region is this?',
        image: '/images/lol/maps/ionia.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Bilgewater',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Ionia',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Freljord',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Targon',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-m-6',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'Which LoL region is this?',
        image: '/images/lol/maps/freljord.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Demacia',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Freljord',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Shurima',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Noxus',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-m-7',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'Which LoL region is this?',
        image: '/images/lol/maps/shurima.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Targon',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Shurima',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Void',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Bilgewater',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-m-8',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'Which LoL region is this?',
        image: '/images/lol/maps/bilgewater.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Shadow Isles',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Bilgewater',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Ionia',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Zaun',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-m-9',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'Which LoL region is this?',
        image: '/images/lol/maps/demacia.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Piltover',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Demacia',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Noxus',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Ionia',
                isCorrect: false
            }
        ]
    },
    {
        id: 'lol-m-10',
        gameId: 'league-of-legends',
        type: 'map',
        prompt: 'Which LoL location is this?',
        image: '/images/lol/maps/baron_pit.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Dragon Pit',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Baron Pit',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Blue Buff',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Red Buff',
                isCorrect: false
            }
        ]
    }
];
// ─── MOBILE LEGENDS Questions ─────────────────────────────────────────────────
const MLBB_CHARACTER = [
    {
        id: 'ml-c-1',
        gameId: 'mobile-legends',
        type: 'character',
        prompt: 'Which MLBB hero is this?',
        image: '/images/mlbb/heroes/layla.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Lesley',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Layla',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Miya',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Hanabi',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-c-2',
        gameId: 'mobile-legends',
        type: 'character',
        prompt: 'Which MLBB hero is this?',
        image: '/images/mlbb/heroes/alucard.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Zilong',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Alucard',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Roger',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Argus',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-c-3',
        gameId: 'mobile-legends',
        type: 'character',
        prompt: 'Which MLBB hero is this?',
        image: '/images/mlbb/heroes/tigreal.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Franco',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Tigreal',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Gatotkaca',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Atlas',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-c-4',
        gameId: 'mobile-legends',
        type: 'character',
        prompt: 'Which MLBB hero is this?',
        image: '/images/mlbb/heroes/kagura.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Lunox',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Kagura',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Lylia',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Cecilion',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-c-5',
        gameId: 'mobile-legends',
        type: 'character',
        prompt: 'Which MLBB hero is this?',
        image: '/images/mlbb/heroes/fanny.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Hayabusa',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Gusion',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Fanny',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Lancelot',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-c-6',
        gameId: 'mobile-legends',
        type: 'character',
        prompt: 'Which MLBB hero is this?',
        image: '/images/mlbb/heroes/gusion.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Lancelot',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Gusion',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Hayabusa',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Ling',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-c-7',
        gameId: 'mobile-legends',
        type: 'character',
        prompt: 'Which MLBB hero is this?',
        image: '/images/mlbb/heroes/chou.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Paquito',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Chou',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Yu Zhong',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Khaleed',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-c-8',
        gameId: 'mobile-legends',
        type: 'character',
        prompt: 'Which MLBB hero is this?',
        image: '/images/mlbb/heroes/wanwan.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Hanabi',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Wanwan',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Kimmy',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Beatrix',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-c-9',
        gameId: 'mobile-legends',
        type: 'character',
        prompt: 'Which MLBB hero is this?',
        image: '/images/mlbb/heroes/ling.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Hayabusa',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Fanny',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Ling',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Lancelot',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-c-10',
        gameId: 'mobile-legends',
        type: 'character',
        prompt: 'Which MLBB hero is this?',
        image: '/images/mlbb/heroes/grock.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Uranus',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Baxia',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Grock',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Belerick',
                isCorrect: false
            }
        ]
    }
];
const MLBB_MAP = [
    {
        id: 'ml-m-1',
        gameId: 'mobile-legends',
        type: 'map',
        prompt: 'Which MLBB battlefield is this?',
        image: '/images/mlbb/maps/land_of_dawn.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Land of Dawn',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Lost Jungle',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Enchanted Forest',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Canyon of Veil',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-m-2',
        gameId: 'mobile-legends',
        type: 'map',
        prompt: 'Which MLBB jungle area is this?',
        image: '/images/mlbb/maps/turtle_pit.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Lord Pit',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Turtle Pit',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Blue Buff',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Red Buff',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-m-3',
        gameId: 'mobile-legends',
        type: 'map',
        prompt: 'Which MLBB jungle area is this?',
        image: '/images/mlbb/maps/lord_pit.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Turtle Pit',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Lord Pit',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Crab Spot',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Base Turret',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-m-4',
        gameId: 'mobile-legends',
        type: 'map',
        prompt: 'Which MLBB map view is this?',
        image: '/images/mlbb/maps/minimap.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Classic Map',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Brawl Map',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Mayhem Map',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Ranked Map',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-m-5',
        gameId: 'mobile-legends',
        type: 'map',
        prompt: 'Which MLBB game mode map is this?',
        image: '/images/mlbb/maps/brawl_map.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Survival Map',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Brawl Map',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Classic Map',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Mayhem Map',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-m-6',
        gameId: 'mobile-legends',
        type: 'map',
        prompt: 'Which MLBB lane is this area?',
        image: '/images/mlbb/maps/top_lane.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Gold Lane',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Exp Lane',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Mid Lane',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Jungle',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-m-7',
        gameId: 'mobile-legends',
        type: 'map',
        prompt: 'Which MLBB lane is this area?',
        image: '/images/mlbb/maps/bot_lane.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Exp Lane',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Gold Lane',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Mid Lane',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Roaming',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-m-8',
        gameId: 'mobile-legends',
        type: 'map',
        prompt: 'Which MLBB location is this?',
        image: '/images/mlbb/maps/blue_buff.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Red Buff',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Blue Buff',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Lithowanderer',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Luminous Lord',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-m-9',
        gameId: 'mobile-legends',
        type: 'map',
        prompt: 'Which MLBB location is this?',
        image: '/images/mlbb/maps/red_buff.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Blue Buff',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Red Buff',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Crab',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Lithowanderer',
                isCorrect: false
            }
        ]
    },
    {
        id: 'ml-m-10',
        gameId: 'mobile-legends',
        type: 'map',
        prompt: 'Which MLBB base structure is this?',
        image: '/images/mlbb/maps/base_crystal.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Turret',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Base Crystal',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Inhibitor',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Nexus',
                isCorrect: false
            }
        ]
    }
];
// ─── TEKKEN Questions ──────────────────────────────────────────────────────────
const TEKKEN_CHARACTER = [
    {
        id: 'tk-c-1',
        gameId: 'tekken',
        type: 'character',
        prompt: 'Which Tekken fighter is this?',
        image: '/images/tekken/fighters/jin.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Kazuya',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Jin Kazama',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Heihachi',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Lee Chaolan',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-c-2',
        gameId: 'tekken',
        type: 'character',
        prompt: 'Which Tekken fighter is this?',
        image: '/images/tekken/fighters/kazuya.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Jin Kazama',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Kazuya Mishima',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Heihachi',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Devil Jin',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-c-3',
        gameId: 'tekken',
        type: 'character',
        prompt: 'Which Tekken fighter is this?',
        image: '/images/tekken/fighters/heihachi.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Kazuya',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Heihachi Mishima',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Jin',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Lars',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-c-4',
        gameId: 'tekken',
        type: 'character',
        prompt: 'Which Tekken fighter is this?',
        image: '/images/tekken/fighters/nina.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Anna Williams',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Nina Williams',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Zafina',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Kazumi',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-c-5',
        gameId: 'tekken',
        type: 'character',
        prompt: 'Which Tekken fighter is this?',
        image: '/images/tekken/fighters/paul.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Marshall Law',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Paul Phoenix',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Bryan Fury',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Bob',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-c-6',
        gameId: 'tekken',
        type: 'character',
        prompt: 'Which Tekken fighter is this?',
        image: '/images/tekken/fighters/king.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Armor King',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'King',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Marduk',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Jack-8',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-c-7',
        gameId: 'tekken',
        type: 'character',
        prompt: 'Which Tekken fighter is this?',
        image: '/images/tekken/fighters/eddy.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Hwoarang',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Eddy Gordo',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Christie',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Lei Wulong',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-c-8',
        gameId: 'tekken',
        type: 'character',
        prompt: 'Which Tekken fighter is this?',
        image: '/images/tekken/fighters/hwoarang.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Baek Doo San',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Hwoarang',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Eddy Gordo',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Jin',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-c-9',
        gameId: 'tekken',
        type: 'character',
        prompt: 'Which Tekken fighter is this?',
        image: '/images/tekken/fighters/yoshimitsu.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Kunimitsu',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Yoshimitsu',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Raven',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Shaheen',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-c-10',
        gameId: 'tekken',
        type: 'character',
        prompt: 'Which Tekken fighter is this?',
        image: '/images/tekken/fighters/alisa.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Jack-8',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Alisa Bosconovitch',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Lili',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Zafina',
                isCorrect: false
            }
        ]
    }
];
const TEKKEN_MAP = [
    {
        id: 'tk-m-1',
        gameId: 'tekken',
        type: 'map',
        prompt: 'Which Tekken stage is this?',
        image: '/images/tekken/stages/mishima_dojo.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'Mishima Dojo',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Forgotten Realm',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Jungle Outpost',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Precipice of Fate',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-m-2',
        gameId: 'tekken',
        type: 'map',
        prompt: 'Which Tekken stage is this?',
        image: '/images/tekken/stages/forgotten_realm.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Arctic Snowfall',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Forgotten Realm',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Mishima Dojo',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Twilight Conflict',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-m-3',
        gameId: 'tekken',
        type: 'map',
        prompt: 'Which Tekken stage is this?',
        image: '/images/tekken/stages/polar_paradise.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Forgotten Realm',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Polar Paradox',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Arctic Snowfall',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Cave of Enlightenment',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-m-4',
        gameId: 'tekken',
        type: 'map',
        prompt: 'Which Tekken stage is this?',
        image: '/images/tekken/stages/ling_dojo.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Mishima Dojo',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Ling Xiaoyu\'s Stage',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Jungle Outpost',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Twilight Conflict',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-m-5',
        gameId: 'tekken',
        type: 'map',
        prompt: 'Which Tekken stage is this?',
        image: '/images/tekken/stages/dynamic_weather.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Precipice of Fate',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Urban Warzone',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Twilight Conflict',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Forgotten Realm',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-m-6',
        gameId: 'tekken',
        type: 'map',
        prompt: 'Which Tekken stage is this?',
        image: '/images/tekken/stages/jungle.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Jungle Outpost',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Cave of Enlightenment',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Forgotten Realm',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Precipice of Fate',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-m-7',
        gameId: 'tekken',
        type: 'map',
        prompt: 'Which Tekken stage is this?',
        image: '/images/tekken/stages/urban.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Mishima Dojo',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Urban Warzone',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Jungle Outpost',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Forgotten Realm',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-m-8',
        gameId: 'tekken',
        type: 'map',
        prompt: 'Which Tekken stage is this?',
        image: '/images/tekken/stages/cave.jpg',
        difficulty: 'Hard',
        points: 300,
        answers: [
            {
                id: 'a',
                text: 'Jungle Outpost',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Cave of Enlightenment',
                isCorrect: true
            },
            {
                id: 'c',
                text: 'Forgotten Realm',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Mishima Dojo',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-m-9',
        gameId: 'tekken',
        type: 'map',
        prompt: 'Which Tekken stage is this?',
        image: '/images/tekken/stages/precipice.jpg',
        difficulty: 'Medium',
        points: 200,
        answers: [
            {
                id: 'a',
                text: 'Precipice of Fate',
                isCorrect: true
            },
            {
                id: 'b',
                text: 'Arctic Snowfall',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'Mishima Dojo',
                isCorrect: false
            },
            {
                id: 'd',
                text: 'Cave of Enlightenment',
                isCorrect: false
            }
        ]
    },
    {
        id: 'tk-m-10',
        gameId: 'tekken',
        type: 'map',
        prompt: 'Which Tekken stage is this?',
        image: '/images/tekken/stages/arena.jpg',
        difficulty: 'Easy',
        points: 100,
        answers: [
            {
                id: 'a',
                text: 'G Corp Helipad',
                isCorrect: false
            },
            {
                id: 'b',
                text: 'Howard Estate',
                isCorrect: false
            },
            {
                id: 'c',
                text: 'The Arena',
                isCorrect: true
            },
            {
                id: 'd',
                text: 'Mishima Dojo',
                isCorrect: false
            }
        ]
    }
];
const ALL_QUESTIONS = {
    valorant: {
        character: VALORANT_CHARACTER,
        map: VALORANT_MAP
    },
    pokemon: {
        character: POKEMON_CHARACTER,
        map: POKEMON_MAP
    },
    'league-of-legends': {
        character: LOL_CHARACTER,
        map: LOL_MAP
    },
    'mobile-legends': {
        character: MLBB_CHARACTER,
        map: MLBB_MAP
    },
    tekken: {
        character: TEKKEN_CHARACTER,
        map: TEKKEN_MAP
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/GameCard.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
'use client';
;
// Game icons as SVG or emoji representations
const GAME_ICONS = {
    valorant: '🎯',
    'mobile-legends': '⚔️',
    pokemon: '⚡',
    'league-of-legends': '🏆',
    tekken: '👊'
};
const GAME_GRADIENTS = {
    valorant: 'from-red-900/40 to-background',
    'mobile-legends': 'from-cyan-900/40 to-background',
    pokemon: 'from-yellow-900/40 to-background',
    'league-of-legends': 'from-purple-900/40 to-background',
    tekken: 'from-orange-900/40 to-background'
};
function GameCard({ game, onClick, selected, showStats, highScore }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 w-full aspect-video flex flex-col items-start justify-end p-4 text-left ${selected ? 'border-primary bg-surface-container shadow-[0_0_25px_rgba(210,187,255,0.3)]' : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container hover:-translate-y-1 hover:scale-[1.02]'}`,
        style: selected ? {
            boxShadow: `0 0 30px -5px ${game.accentColor}40`
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute inset-0 bg-gradient-to-b ${GAME_GRADIENTS[game.id]} z-0`
            }, void 0, false, {
                fileName: "[project]/src/components/GameCard.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 z-0 select-none",
                children: GAME_ICONS[game.id]
            }, void 0, false, {
                fileName: "[project]/src/components/GameCard.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-2 right-2 z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-primary text-lg",
                    style: {
                        fontVariationSettings: "'FILL' 1"
                    },
                    children: "check_circle"
                }, void 0, false, {
                    fileName: "[project]/src/components/GameCard.tsx",
                    lineNumber: 56,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GameCard.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-heading font-bold text-white uppercase tracking-widest block text-sm mb-0.5",
                        children: game.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCard.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-label-sm font-body text-on-surface-variant/80",
                        children: game.genre
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCard.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    showStats && highScore !== undefined && highScore > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-tertiary text-xs",
                                style: {
                                    fontVariationSettings: "'FILL' 1"
                                },
                                children: "emoji_events"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCard.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-label-sm font-mono text-tertiary",
                                children: highScore.toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCard.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameCard.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCard.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCard.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = GameCard;
var _c;
__turbopack_context__.k.register(_c, "GameCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/LandingPage.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LandingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/GameCard.tsx [client] (ecmascript)");
'use client';
;
;
;
function LandingPage({ onNavigate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "flex flex-col items-center justify-center text-center py-16 md:py-28 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-primary/20 text-primary text-label-sm font-mono tracking-widest uppercase mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            "Live · Season 4"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-5xl md:text-[72px] font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-container mb-6 leading-tight uppercase",
                        children: "GameGuess Arena"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-lg font-body text-on-surface-variant max-w-2xl mb-8",
                        children: "Can you recognize the voice, character, or map? Test your gaming knowledge across VALORANT, Pokémon, LoL, MLBB, and Tekken."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('games'),
                        className: "flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-10 py-4 rounded-lg uppercase tracking-widest transition-all duration-300 hover:-skew-x-3 hover:scale-105",
                        style: {
                            boxShadow: '0 0 25px rgba(210,187,255,0.4), inset 0 0 10px rgba(210,187,255,0.1)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined",
                                style: {
                                    fontVariationSettings: "'FILL' 1"
                                },
                                children: "play_arrow"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            "Play Now"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/LandingPage.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-12 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "md:col-span-8 glass-panel rounded-xl p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-headline-lg font-heading text-primary",
                                        children: "Choose Your Game"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onNavigate('games'),
                                        className: "text-label-sm font-mono text-secondary hover:underline uppercase",
                                        children: "View All"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 gap-3",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].map((game)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        game: game,
                                        onClick: ()=>onNavigate('games')
                                    }, game.id, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:col-span-4 flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-headline-md font-heading text-on-surface mb-4",
                                        children: "Quick Play"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["QUIZ_MODES"].slice(0, 4).map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onNavigate('games'),
                                                className: "flex items-center gap-3 px-3 py-3 rounded-lg border border-outline-variant/30 hover:bg-surface-container hover:border-primary/30 transition-all group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded bg-surface-container-high border border-outline-variant/30 flex items-center justify-center group-hover:border-primary/30 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-symbols-outlined text-base text-on-surface-variant group-hover:text-primary transition-colors",
                                                            children: mode.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/LandingPage.tsx",
                                                            lineNumber: 77,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-heading font-semibold text-on-surface group-hover:text-primary transition-colors",
                                                                children: mode.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                                lineNumber: 82,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-label-sm font-mono text-outline",
                                                                children: [
                                                                    mode.timeLimit,
                                                                    "s/Q"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                                lineNumber: 85,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors",
                                                        children: "chevron_right"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 87,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, mode.id, true, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-5 border border-tertiary/20 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-tertiary/5 pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-tertiary text-lg",
                                                        style: {
                                                            fontVariationSettings: "'FILL' 1"
                                                        },
                                                        children: "today"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-label-sm font-mono text-tertiary uppercase tracking-widest",
                                                        children: "Daily Challenge"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 97,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-headline-md font-heading text-on-surface mb-1",
                                                children: "Fresh questions every 24h"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 101,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-label-sm font-body text-on-surface-variant mb-4",
                                                children: "Compete with players worldwide for the top spot."
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 102,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onNavigate('games'),
                                                className: "w-full flex items-center justify-center gap-2 border border-tertiary/50 text-tertiary hover:bg-tertiary/10 font-mono text-label-lg py-2.5 rounded-lg uppercase tracking-widest transition-all text-sm",
                                                children: [
                                                    "Accept Challenge",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm",
                                                        children: "arrow_forward"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 103,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-label-lg font-mono text-on-surface-variant uppercase tracking-widest mb-4",
                                        children: "Global Stats"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            {
                                                label: 'Players',
                                                value: '142K',
                                                icon: 'groups'
                                            },
                                            {
                                                label: 'Questions',
                                                value: '645',
                                                icon: 'quiz'
                                            },
                                            {
                                                label: 'Games',
                                                value: '5',
                                                icon: 'sports_esports'
                                            },
                                            {
                                                label: 'Avg Score',
                                                value: '3,280',
                                                icon: 'trending_up'
                                            }
                                        ].map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-surface-container-high rounded-lg p-3 border border-outline-variant/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "material-symbols-outlined text-sm text-outline",
                                                                children: stat.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-label-sm font-mono text-outline uppercase text-xs",
                                                                children: stat.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                                lineNumber: 126,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-headline-md font-heading text-on-surface font-bold",
                                                        children: stat.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, stat.label, true, {
                                                fileName: "[project]/src/pages/LandingPage.tsx",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LandingPage.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LandingPage.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LandingPage.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/LandingPage.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/LandingPage.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = LandingPage;
var _c;
__turbopack_context__.k.register(_c, "LandingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/index.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateRank",
    ()=>calculateRank,
    "calculateStreakBonus",
    ()=>calculateStreakBonus,
    "calculateTimeBonus",
    ()=>calculateTimeBonus,
    "formatDate",
    ()=>formatDate,
    "formatScore",
    ()=>formatScore,
    "getAccuracyColor",
    ()=>getAccuracyColor,
    "getGameById",
    ()=>getGameById,
    "getHighScores",
    ()=>getHighScores,
    "getModeById",
    ()=>getModeById,
    "getPersonalBest",
    ()=>getPersonalBest,
    "getResults",
    ()=>getResults,
    "getUsername",
    ()=>getUsername,
    "saveHighScore",
    ()=>saveHighScore,
    "saveResult",
    ()=>saveResult,
    "saveUsername",
    ()=>saveUsername,
    "shuffleArray",
    ()=>shuffleArray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [client] (ecmascript)");
;
// LocalStorage keys
const HS_KEY = 'gameguess_high_scores';
const RESULTS_KEY = 'gameguess_results';
const PROFILE_KEY = 'gameguess_profile';
// Safe localStorage access
const isClient = ("TURBOPACK compile-time value", "object") !== 'undefined';
function getHighScores() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const data = localStorage.getItem(HS_KEY);
        return data ? JSON.parse(data) : [];
    } catch  {
        return [];
    }
}
function saveHighScore(score) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const scores = getHighScores();
        const idx = scores.findIndex((s)=>s.gameId === score.gameId && s.modeId === score.modeId);
        if (idx >= 0) {
            if (score.score > scores[idx].score) {
                scores[idx] = score;
            }
        } else {
            scores.push(score);
        }
        localStorage.setItem(HS_KEY, JSON.stringify(scores));
    } catch  {
    // ignore
    }
}
function getPersonalBest(gameId, modeId) {
    const scores = getHighScores();
    return scores.find((s)=>s.gameId === gameId && s.modeId === modeId) || null;
}
function saveResult(result) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const results = getResults();
        results.unshift(result);
        // Keep last 50 results
        const trimmed = results.slice(0, 50);
        localStorage.setItem(RESULTS_KEY, JSON.stringify(trimmed));
    } catch  {
    // ignore
    }
}
function getResults() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const data = localStorage.getItem(RESULTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch  {
        return [];
    }
}
function saveUsername(username) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(PROFILE_KEY, JSON.stringify({
        username
    }));
}
function getUsername() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const data = localStorage.getItem(PROFILE_KEY);
        return data ? JSON.parse(data).username : 'GuestPlayer';
    } catch  {
        return 'GuestPlayer';
    }
}
function calculateTimeBonus(timeLeft, totalTime) {
    const ratio = timeLeft / totalTime;
    if (ratio > 0.8) return 100;
    if (ratio > 0.6) return 75;
    if (ratio > 0.4) return 50;
    if (ratio > 0.2) return 25;
    return 10;
}
function calculateStreakBonus(streak) {
    if (streak >= 10) return 300;
    if (streak >= 7) return 200;
    if (streak >= 5) return 150;
    if (streak >= 3) return 100;
    if (streak >= 2) return 50;
    return 0;
}
function calculateRank(score, totalPossible) {
    const ratio = score / totalPossible;
    if (ratio >= 0.95) return {
        rank: 'S+',
        percentile: 99
    };
    if (ratio >= 0.90) return {
        rank: 'S',
        percentile: 95
    };
    if (ratio >= 0.80) return {
        rank: 'A',
        percentile: 85
    };
    if (ratio >= 0.70) return {
        rank: 'B',
        percentile: 70
    };
    if (ratio >= 0.55) return {
        rank: 'C',
        percentile: 50
    };
    if (ratio >= 0.40) return {
        rank: 'D',
        percentile: 30
    };
    return {
        rank: 'F',
        percentile: 10
    };
}
function getGameById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === id);
}
function getModeById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["QUIZ_MODES"].find((m)=>m.id === id);
}
function formatScore(score) {
    return score.toLocaleString();
}
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function getAccuracyColor(accuracy) {
    if (accuracy >= 90) return 'text-secondary-fixed';
    if (accuracy >= 75) return 'text-primary';
    if (accuracy >= 60) return 'text-tertiary';
    return 'text-error';
}
function shuffleArray(array) {
    const shuffled = [
        ...array
    ];
    for(let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i]
        ];
    }
    return shuffled;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/GameSelectionPage.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameSelectionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/GameCard.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function GameSelectionPage({ onNavigate, onSelectGame }) {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const highScores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getHighScores"])();
    const handleSelect = (gameId)=>{
        setSelected(gameId);
    };
    const handleContinue = ()=>{
        if (!selected) return;
        onSelectGame(selected);
        onNavigate('quiz-mode');
    };
    const selectedGame = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === selected);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-10 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('home'),
                        className: "flex items-center gap-1 text-on-surface-variant hover:text-primary text-label-sm font-mono uppercase tracking-wide transition-colors mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-sm",
                                children: "arrow_back"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            "Back to Home"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-label-sm font-mono uppercase tracking-widest mb-3",
                        children: "Step 1 of 2"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-display-sm font-display font-black text-on-surface mb-2",
                        children: "Select Your Game"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md font-body text-on-surface-variant",
                        children: "Choose the game universe you want to be tested on."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].map((game)=>{
                    const hs = highScores.find((h)=>h.gameId === game.id);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        game: game,
                        onClick: ()=>handleSelect(game.id),
                        selected: selected === game.id,
                        showStats: true,
                        highScore: hs?.score
                    }, game.id, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 56,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            selectedGame ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-panel rounded-xl p-6 mb-8 border border-primary/20 animate-fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row items-start md:items-center gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-4xl select-none",
                                            children: selectedGame.emoji
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-headline-lg font-heading text-on-surface",
                                                    children: selectedGame.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-label-sm font-mono text-on-surface-variant",
                                                    children: selectedGame.genre
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-body-md font-body text-on-surface-variant",
                                    children: selectedGame.description
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 mt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-label-sm font-mono text-outline",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xs",
                                                    children: "quiz"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 19
                                                }, this),
                                                selectedGame.questionCount,
                                                " questions"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-label-sm font-mono text-outline",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xs",
                                                    children: "leaderboard"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, this),
                                                "Active leaderboard"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                            lineNumber: 86,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleContinue,
                            className: "flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-8 py-3 rounded-lg uppercase tracking-widest hover:-skew-x-1 hover:scale-105 transition-all",
                            style: {
                                boxShadow: '0 0 20px rgba(210,187,255,0.3)'
                            },
                            children: [
                                "Continue",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined",
                                    children: "arrow_forward"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/GameSelectionPage.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/GameSelectionPage.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-panel rounded-xl p-8 mb-8 text-center border border-outline-variant/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined text-4xl text-outline mb-3 block",
                        children: "touch_app"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md font-body text-on-surface-variant",
                        children: "Select a game above to continue"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-3",
                children: [
                    {
                        icon: '🎯',
                        label: 'Voice Lines',
                        desc: 'Identify characters by quotes'
                    },
                    {
                        icon: '👤',
                        label: 'Characters',
                        desc: 'Guess from descriptions'
                    },
                    {
                        icon: '🗺️',
                        label: 'Maps & Stages',
                        desc: 'Locate iconic locations'
                    },
                    {
                        icon: '🎲',
                        label: 'Mixed Mode',
                        desc: 'All types combined'
                    }
                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-surface-container rounded-lg p-4 border border-outline-variant/20 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl select-none",
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-heading font-semibold text-on-surface",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-label-sm font-body text-on-surface-variant",
                                        children: item.desc
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.label, true, {
                        fileName: "[project]/src/pages/GameSelectionPage.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/GameSelectionPage.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/GameSelectionPage.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(GameSelectionPage, "PVKrpNrydW4BpnDEq9OT3cVmCk4=");
_c = GameSelectionPage;
var _c;
__turbopack_context__.k.register(_c, "GameSelectionPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ModeCard.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModeCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
'use client';
;
const DIFFICULTY_COLORS = {
    Easy: 'text-secondary-fixed border-secondary-fixed/40 bg-secondary-fixed/10',
    Medium: 'text-tertiary border-tertiary/40 bg-tertiary/10',
    Hard: 'text-valo-red border-valo-red/40 bg-valo-red/10',
    Variable: 'text-primary border-primary/40 bg-primary/10'
};
function ModeCard({ mode, onClick, selected }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `group relative border rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-300 text-left w-full ${selected ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(210,187,255,0.3)]' : 'border-outline-variant/50 bg-surface-container-low hover:border-primary/50 hover:bg-surface-container hover:-translate-y-0.5'}`,
        children: [
            mode.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-3 right-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-label-sm font-mono text-tertiary border border-tertiary/30 bg-tertiary/10 px-2 py-0.5 rounded-full",
                    children: mode.badge
                }, void 0, false, {
                    fileName: "[project]/src/components/ModeCard.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ModeCard.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-10 h-10 rounded-lg flex items-center justify-center border ${selected ? 'bg-primary/20 border-primary/30' : 'bg-surface-container-high border-outline-variant/30 group-hover:bg-primary/10 group-hover:border-primary/20'} transition-all`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `material-symbols-outlined text-xl ${selected ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'} transition-colors`,
                    style: {
                        fontVariationSettings: selected ? "'FILL' 1" : "'FILL' 0"
                    },
                    children: mode.icon
                }, void 0, false, {
                    fileName: "[project]/src/components/ModeCard.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ModeCard.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: `font-heading font-semibold text-base mb-1 ${selected ? 'text-primary' : 'text-on-surface group-hover:text-primary'} transition-colors`,
                        children: mode.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/ModeCard.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-label-sm font-body text-on-surface-variant leading-relaxed",
                        children: mode.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/ModeCard.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ModeCard.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mt-auto pt-2 border-t border-outline-variant/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-label-sm font-mono border rounded-full px-2 py-0.5 ${DIFFICULTY_COLORS[mode.difficulty]}`,
                        children: mode.difficulty
                    }, void 0, false, {
                        fileName: "[project]/src/components/ModeCard.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 text-outline text-label-sm font-mono",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-xs",
                                children: "timer"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ModeCard.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            mode.questionCount === 999 ? '∞' : mode.questionCount,
                            "Q · ",
                            mode.timeLimit,
                            "s"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ModeCard.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ModeCard.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ModeCard.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = ModeCard;
var _c;
__turbopack_context__.k.register(_c, "ModeCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/QuizModeSelectionPage.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuizModeSelectionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ModeCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ModeCard.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function QuizModeSelectionPage({ selectedGameId, onNavigate, onSelectMode }) {
    _s();
    const [selectedMode, setSelectedMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const game = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === selectedGameId);
    const handleContinue = ()=>{
        if (!selectedMode) return;
        onSelectMode(selectedMode);
        onNavigate('quiz');
    };
    const mode = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["QUIZ_MODES"].find((m)=>m.id === selectedMode);
    const pb = selectedGameId && selectedMode ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getPersonalBest"])(selectedGameId, selectedMode) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-10 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('games'),
                        className: "flex items-center gap-1 text-on-surface-variant hover:text-primary text-label-sm font-mono uppercase tracking-wide transition-colors mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-sm",
                                children: "arrow_back"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            "Back to Game Selection"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-label-sm font-mono uppercase tracking-widest mb-3",
                        children: "Step 2 of 2"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 mb-3",
                        children: [
                            game && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-4xl select-none",
                                children: game.emoji
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                lineNumber: 47,
                                columnNumber: 20
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-display-sm font-display font-black text-on-surface",
                                        children: "Select Quiz Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    game && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-md font-body text-on-surface-variant",
                                        children: [
                                            "Playing: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-primary font-semibold",
                                                children: game.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                                lineNumber: 54,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["QUIZ_MODES"].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ModeCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        mode: m,
                        onClick: ()=>setSelectedMode(m.id),
                        selected: selectedMode === m.id
                    }, m.id, false, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            mode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-panel rounded-xl p-6 border border-primary/20 animate-fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row items-start md:items-center gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-primary",
                                                style: {
                                                    fontVariationSettings: "'FILL' 1"
                                                },
                                                children: mode.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                                lineNumber: 80,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-headline-md font-heading text-on-surface",
                                            children: mode.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-body-md font-body text-on-surface-variant mb-3",
                                    children: mode.description
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-label-sm font-mono text-outline",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xs",
                                                    children: "timer"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 19
                                                }, this),
                                                mode.timeLimit,
                                                "s per question"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-label-sm font-mono text-outline",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xs",
                                                    children: "quiz"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 19
                                                }, this),
                                                mode.questionCount === 999 ? 'Unlimited' : `${mode.questionCount} questions`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                            lineNumber: 92,
                                            columnNumber: 17
                                        }, this),
                                        pb && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-label-sm font-mono text-tertiary",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xs",
                                                    children: "emoji_events"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 21
                                                }, this),
                                                "PB: ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatScore"])(pb.score)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                            lineNumber: 97,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleContinue,
                            className: "flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-10 py-4 rounded-lg uppercase tracking-widest hover:-skew-x-1 hover:scale-105 transition-all",
                            style: {
                                boxShadow: '0 0 20px rgba(210,187,255,0.3)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined",
                                    style: {
                                        fontVariationSettings: "'FILL' 1"
                                    },
                                    children: "play_arrow"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this),
                                "Start Quiz"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-panel rounded-xl p-8 text-center border border-outline-variant/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined text-4xl text-outline mb-3 block",
                        children: "touch_app"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md font-body text-on-surface-variant",
                        children: "Select a mode above to begin"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/QuizModeSelectionPage.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(QuizModeSelectionPage, "0xkNKoDuKbt90s41gA5N0jwRM38=");
_c = QuizModeSelectionPage;
var _c;
__turbopack_context__.k.register(_c, "QuizModeSelectionPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ScoreDisplay.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScoreDisplay",
    ()=>ScoreDisplay,
    "StreakDisplay",
    ()=>StreakDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
'use client';
;
function ScoreDisplay({ score, label = 'Score', size = 'md', showGlow }) {
    const sizeClasses = {
        sm: 'px-3 py-1.5',
        md: 'px-4 py-2',
        lg: 'px-6 py-3'
    };
    const scoreSizes = {
        sm: 'text-lg',
        md: 'text-headline-md',
        lg: 'text-headline-lg'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-surface-container-high rounded-lg ${sizeClasses[size]} flex flex-col border border-outline/10`,
        style: showGlow ? {
            boxShadow: '0 0 15px rgba(210,187,255,0.2)'
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-label-sm font-body text-outline uppercase tracking-widest",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ScoreDisplay.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${scoreSizes[size]} font-heading font-bold text-on-surface`,
                children: score.toLocaleString()
            }, void 0, false, {
                fileName: "[project]/src/components/ScoreDisplay.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ScoreDisplay.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = ScoreDisplay;
function StreakDisplay({ streak, size = 'md' }) {
    const sizeClasses = {
        sm: 'px-3 py-1.5',
        md: 'px-4 py-2'
    };
    const isHot = streak >= 3;
    const isOnFire = streak >= 5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-surface-container-high rounded-lg ${sizeClasses[size]} flex flex-col border border-outline/10`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-label-sm font-body text-outline uppercase tracking-widest",
                children: "Streak"
            }, void 0, false, {
                fileName: "[project]/src/components/ScoreDisplay.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-headline-md font-heading font-bold flex items-center gap-1 ${isOnFire ? 'text-valo-red' : isHot ? 'text-tertiary' : 'text-on-surface'}`,
                children: [
                    streak,
                    "x",
                    ' ',
                    isHot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined text-[20px]",
                        style: {
                            fontVariationSettings: "'FILL' 1"
                        },
                        children: "local_fire_department"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ScoreDisplay.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ScoreDisplay.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ScoreDisplay.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c1 = StreakDisplay;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScoreDisplay");
__turbopack_context__.k.register(_c1, "StreakDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TimerBar.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TimerBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function TimerBar({ timeLimit, onTimeUp, isActive, onTick }) {
    _s();
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(timeLimit);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerBar.useEffect": ()=>{
            setTimeLeft(timeLimit);
        }
    }["TimerBar.useEffect"], [
        timeLimit
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerBar.useEffect": ()=>{
            if (!isActive) return;
            if (timeLeft <= 0) {
                onTimeUp();
                return;
            }
            const interval = setInterval({
                "TimerBar.useEffect.interval": ()=>{
                    setTimeLeft({
                        "TimerBar.useEffect.interval": (prev)=>{
                            const next = prev - 1;
                            if (onTick) onTick(next);
                            return next;
                        }
                    }["TimerBar.useEffect.interval"]);
                }
            }["TimerBar.useEffect.interval"], 1000);
            return ({
                "TimerBar.useEffect": ()=>clearInterval(interval)
            })["TimerBar.useEffect"];
        }
    }["TimerBar.useEffect"], [
        isActive,
        timeLeft,
        onTimeUp,
        onTick
    ]);
    const pct = timeLeft / timeLimit * 100;
    const isWarning = timeLeft <= 5;
    const isLow = timeLeft <= 10;
    const barColor = isWarning ? 'bg-valo-red' : isLow ? 'bg-tertiary' : 'bg-secondary-container';
    const timerBg = isWarning ? 'border-valo-red animate-pulse-red' : isLow ? 'border-tertiary' : 'border-secondary-container';
    const timerTextColor = isWarning ? 'text-valo-red' : isLow ? 'text-tertiary' : 'text-on-surface';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-4 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 h-2 bg-surface-variant rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `h-full ${barColor} rounded-full transition-all duration-1000`,
                    style: {
                        width: `${pct}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/TimerBar.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/TimerBar.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-14 h-14 rounded-full flex items-center justify-center border-2 ${timerBg} bg-surface-container-high flex-shrink-0`,
                style: {
                    boxShadow: isWarning ? '0 0 10px rgba(255,70,85,0.5)' : undefined
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `font-heading font-bold text-lg ${timerTextColor}`,
                    children: timeLeft
                }, void 0, false, {
                    fileName: "[project]/src/components/TimerBar.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/TimerBar.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TimerBar.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(TimerBar, "UyEYcnqu5bZUkmU/eQaUxpAK5Z0=");
_c = TimerBar;
var _c;
__turbopack_context__.k.register(_c, "TimerBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AnswerButton.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnswerButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
'use client';
;
function AnswerButton({ label, text, onClick, state = 'default', disabled }) {
    const stateClasses = {
        default: 'border-surface-variant bg-surface-container-high hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(210,187,255,0.3)]',
        selected: 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(210,187,255,0.4)]',
        correct: 'border-secondary-fixed bg-secondary-fixed/20 shadow-[0_0_30px_rgba(116,245,255,0.5)]',
        incorrect: 'border-valo-red bg-valo-red/20 shadow-[0_0_30px_rgba(255,70,85,0.5)]',
        revealed: 'border-secondary-fixed/50 bg-secondary-fixed/10'
    };
    const textColors = {
        default: 'text-white group-hover:text-primary',
        selected: 'text-primary',
        correct: 'text-secondary-fixed',
        incorrect: 'text-valo-red',
        revealed: 'text-secondary-fixed/80'
    };
    const labelColors = {
        default: 'text-outline',
        selected: 'text-primary/70',
        correct: 'text-secondary-fixed/70',
        incorrect: 'text-valo-red/70',
        revealed: 'text-secondary-fixed/50'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: `group relative border-2 rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 w-full text-left ${stateClasses[state]} ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'} ${!disabled && state === 'default' ? 'hover:-skew-x-1' : ''}`,
        style: {
            minHeight: '80px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute top-2 left-3 text-label-sm font-mono ${labelColors[state]} font-bold`,
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/AnswerButton.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            state === 'correct' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-2 right-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-secondary-fixed text-sm",
                    style: {
                        fontVariationSettings: "'FILL' 1"
                    },
                    children: "check_circle"
                }, void 0, false, {
                    fileName: "[project]/src/components/AnswerButton.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AnswerButton.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            state === 'incorrect' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-2 right-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-valo-red text-sm",
                    style: {
                        fontVariationSettings: "'FILL' 1"
                    },
                    children: "cancel"
                }, void 0, false, {
                    fileName: "[project]/src/components/AnswerButton.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AnswerButton.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-headline-md font-heading font-bold ${textColors[state]} transition-colors text-center`,
                children: text
            }, void 0, false, {
                fileName: "[project]/src/components/AnswerButton.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnswerButton.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = AnswerButton;
var _c;
__turbopack_context__.k.register(_c, "AnswerButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AudioPlayer.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AudioPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function AudioPlayer({ isVoiceLine = true, label }) {
    _s();
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasPlayed, setHasPlayed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handlePlay = ()=>{
        if (isPlaying) {
            setIsPlaying(false);
            return;
        }
        setIsPlaying(true);
        setHasPlayed(true);
        // Simulate playback duration
        setTimeout(()=>setIsPlaying(false), 3000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full rounded-lg border border-surface-variant bg-surface-container-highest relative overflow-hidden flex flex-col items-center justify-center gap-4 p-6",
        style: {
            minHeight: '160px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end gap-1 h-12 opacity-30 select-none pointer-events-none",
                children: Array.from({
                    length: 24
                }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-1.5 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-surface-variant'} transition-colors`,
                        style: {
                            height: `${20 + Math.sin(i / 24 * Math.PI * 4) * 18 + Math.random() * 10}px`,
                            animationDelay: `${i * 50}ms`
                        }
                    }, i, false, {
                        fileName: "[project]/src/components/AudioPlayer.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/AudioPlayer.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handlePlay,
                className: `relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border ${isPlaying ? 'bg-primary/30 border-primary shadow-[0_0_25px_rgba(210,187,255,0.5)] scale-110' : 'bg-primary/20 border-primary/60 hover:bg-primary/30 hover:scale-110 shadow-[0_0_15px_rgba(210,187,255,0.2)]'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-primary text-3xl",
                    style: {
                        fontVariationSettings: "'FILL' 1"
                    },
                    children: isPlaying ? 'pause' : 'play_arrow'
                }, void 0, false, {
                    fileName: "[project]/src/components/AudioPlayer.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AudioPlayer.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-label-sm font-mono text-on-surface-variant text-center",
                children: [
                    !hasPlayed && (isVoiceLine ? 'Play voice line to identify the character' : label || 'Click to play audio'),
                    hasPlayed && isPlaying && '🔊 Playing...',
                    hasPlayed && !isPlaying && '✓ Audio played — make your guess below'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AudioPlayer.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute bottom-2 right-2 text-label-sm font-mono text-outline/50 text-xs",
                children: "[placeholder audio]"
            }, void 0, false, {
                fileName: "[project]/src/components/AudioPlayer.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AudioPlayer.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(AudioPlayer, "xbbVD7yplW1/8lMiLTUMkJe71lA=");
_c = AudioPlayer;
var _c;
__turbopack_context__.k.register(_c, "AudioPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/QuizGameplayPage.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuizGameplayPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScoreDisplay$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScoreDisplay.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TimerBar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TimerBar.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnswerButton$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AnswerButton.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AudioPlayer.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function QuizGameplayPage({ gameId, modeId, onNavigate, onQuizComplete }) {
    _s();
    const game = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === gameId);
    const mode = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["QUIZ_MODES"].find((m)=>m.id === modeId);
    // Build question set
    const [questions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        "QuizGameplayPage.useState": ()=>{
            if (!gameId) return [];
            const pool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["ALL_QUESTIONS"][gameId] || [];
            const shuffled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["shuffleArray"])(pool);
            const count = mode?.questionCount === 999 ? 999 : mode?.questionCount || 10;
            return shuffled.slice(0, Math.min(count, shuffled.length));
        }
    }["QuizGameplayPage.useState"]);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [streak, setStreak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [maxStreak, setMaxStreak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [correctCount, setCorrectCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalTimeBonus, setTotalTimeBonus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(mode?.timeLimit || 20);
    const [timerActive, setTimerActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [answerStates, setAnswerStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [selectedAnswerId, setSelectedAnswerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAnswered, setIsAnswered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showHint, setShowHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hintUsed, setHintUsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [endlessLives, setEndlessLives] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const progressPct = totalQuestions > 0 ? currentIndex / totalQuestions * 100 : 0;
    const isEndless = modeId === 'endless';
    const finishQuiz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "QuizGameplayPage.useCallback[finishQuiz]": ()=>{
            const totalPossible = questions.reduce({
                "QuizGameplayPage.useCallback[finishQuiz].totalPossible": (acc, q)=>acc + q.points + 200
            }["QuizGameplayPage.useCallback[finishQuiz].totalPossible"], 0); // approx
            const accuracy = totalQuestions > 0 ? Math.round(correctCount / totalQuestions * 100) : 0;
            const { rank, percentile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["calculateRank"])(score, totalPossible || 3000);
            const result = {
                gameId: gameId,
                modeId: modeId,
                score,
                totalQuestions,
                correctAnswers: correctCount,
                maxStreak,
                accuracy,
                timeBonus: totalTimeBonus,
                rank,
                percentile,
                date: new Date().toISOString(),
                duration: 0
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["saveHighScore"])({
                gameId: gameId,
                modeId: modeId,
                score,
                accuracy,
                date: new Date().toISOString()
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["saveResult"])(result);
            onQuizComplete(result);
            onNavigate('results');
        }
    }["QuizGameplayPage.useCallback[finishQuiz]"], [
        correctCount,
        gameId,
        maxStreak,
        modeId,
        onNavigate,
        onQuizComplete,
        questions,
        score,
        totalQuestions,
        totalTimeBonus
    ]);
    const handleAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "QuizGameplayPage.useCallback[handleAnswer]": (answer)=>{
            if (isAnswered || !currentQuestion) return;
            setTimerActive(false);
            setIsAnswered(true);
            setSelectedAnswerId(answer.id);
            const newStates = {};
            currentQuestion.answers.forEach({
                "QuizGameplayPage.useCallback[handleAnswer]": (a)=>{
                    if (a.id === answer.id) {
                        newStates[a.id] = a.isCorrect ? 'correct' : 'incorrect';
                    } else if (a.isCorrect) {
                        newStates[a.id] = 'revealed';
                    } else {
                        newStates[a.id] = 'default';
                    }
                }
            }["QuizGameplayPage.useCallback[handleAnswer]"]);
            setAnswerStates(newStates);
            if (answer.isCorrect) {
                const bonus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["calculateTimeBonus"])(timeLeft, mode?.timeLimit || 20);
                const streakBonus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["calculateStreakBonus"])(streak + 1);
                const earned = currentQuestion.points + bonus + streakBonus - (hintUsed ? 50 : 0);
                setScore({
                    "QuizGameplayPage.useCallback[handleAnswer]": (prev)=>prev + Math.max(0, earned)
                }["QuizGameplayPage.useCallback[handleAnswer]"]);
                setTotalTimeBonus({
                    "QuizGameplayPage.useCallback[handleAnswer]": (prev)=>prev + bonus
                }["QuizGameplayPage.useCallback[handleAnswer]"]);
                setStreak({
                    "QuizGameplayPage.useCallback[handleAnswer]": (prev)=>{
                        const newStreak = prev + 1;
                        setMaxStreak({
                            "QuizGameplayPage.useCallback[handleAnswer]": (m)=>Math.max(m, newStreak)
                        }["QuizGameplayPage.useCallback[handleAnswer]"]);
                        return newStreak;
                    }
                }["QuizGameplayPage.useCallback[handleAnswer]"]);
                setCorrectCount({
                    "QuizGameplayPage.useCallback[handleAnswer]": (prev)=>prev + 1
                }["QuizGameplayPage.useCallback[handleAnswer]"]);
            } else {
                setStreak(0);
                if (isEndless) {
                    setEndlessLives({
                        "QuizGameplayPage.useCallback[handleAnswer]": (prev)=>{
                            const next = prev - 1;
                            if (next <= 0) {
                                setTimeout(finishQuiz, 1200);
                            }
                            return next;
                        }
                    }["QuizGameplayPage.useCallback[handleAnswer]"]);
                }
            }
        }
    }["QuizGameplayPage.useCallback[handleAnswer]"], [
        isAnswered,
        currentQuestion,
        timeLeft,
        mode,
        streak,
        hintUsed,
        isEndless,
        finishQuiz
    ]);
    const handleTimeUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "QuizGameplayPage.useCallback[handleTimeUp]": ()=>{
            if (isAnswered) return;
            setTimerActive(false);
            setIsAnswered(true);
            // Reveal correct answer
            const newStates = {};
            currentQuestion?.answers.forEach({
                "QuizGameplayPage.useCallback[handleTimeUp]": (a)=>{
                    newStates[a.id] = a.isCorrect ? 'revealed' : 'default';
                }
            }["QuizGameplayPage.useCallback[handleTimeUp]"]);
            setAnswerStates(newStates);
            setStreak(0);
            if (isEndless) {
                setEndlessLives({
                    "QuizGameplayPage.useCallback[handleTimeUp]": (prev)=>{
                        const next = prev - 1;
                        if (next <= 0) {
                            setTimeout(finishQuiz, 1200);
                        }
                        return next;
                    }
                }["QuizGameplayPage.useCallback[handleTimeUp]"]);
            }
        }
    }["QuizGameplayPage.useCallback[handleTimeUp]"], [
        currentQuestion,
        isAnswered,
        isEndless,
        finishQuiz
    ]);
    const handleNext = ()=>{
        if (currentIndex + 1 >= questions.length && !isEndless) {
            finishQuiz();
            return;
        }
        setCurrentIndex((prev)=>prev + 1);
        setIsAnswered(false);
        setAnswerStates({});
        setSelectedAnswerId(null);
        setShowHint(false);
        setHintUsed(false);
        setTimeLeft(mode?.timeLimit || 20);
        setTimerActive(true);
    };
    if (!currentQuestion) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center text-on-surface-variant",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-headline-md font-heading mb-4",
                        children: "No questions available."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('games'),
                        className: "text-primary hover:underline font-mono",
                        children: "Go back"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                lineNumber: 172,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
            lineNumber: 171,
            columnNumber: 7
        }, this);
    }
    const accentColor = game?.accentColor || '#d2bbff';
    const isVoiceLine = currentQuestion.type === 'voice-line';
    const LABELS = [
        'A',
        'B',
        'C',
        'D'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col relative overflow-x-hidden",
        style: {
            backgroundColor: '#0b1326'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-0 pointer-events-none opacity-15",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0",
                    style: {
                        background: `radial-gradient(ellipse at top, ${accentColor}20, transparent 60%)`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "relative z-10 px-4 md:px-12 pt-24 pb-4 flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-label-sm font-mono text-outline",
                                children: [
                                    currentIndex + 1,
                                    "/",
                                    isEndless ? '∞' : totalQuestions
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TimerBar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    timeLimit: mode?.timeLimit || 20,
                                    onTimeUp: handleTimeUp,
                                    isActive: timerActive,
                                    onTick: setTimeLeft
                                }, currentIndex, false, {
                                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScoreDisplay$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ScoreDisplay"], {
                                score: score,
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScoreDisplay$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["StreakDisplay"], {
                                streak: streak,
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 hidden md:block",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-1 bg-surface-variant rounded-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full bg-primary rounded-full transition-all duration-500",
                                        style: {
                                            width: `${progressPct}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm select-none",
                                        children: game?.emoji
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-label-sm font-mono text-on-surface-variant hidden sm:block",
                                        children: game?.shortName
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this),
                            isEndless && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    ...Array(3)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `material-symbols-outlined text-sm ${i < endlessLives ? 'text-valo-red' : 'text-surface-variant'}`,
                                        style: {
                                            fontVariationSettings: "'FILL' 1"
                                        },
                                        children: "favorite"
                                    }, i, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 242,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 relative z-10 max-w-5xl mx-auto w-full px-4 md:px-12 py-4 flex flex-col lg:flex-row gap-6 items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full lg:w-1/2 flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl p-5 border border-surface-variant bg-surface-container relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-label-sm font-mono border rounded-full px-2 py-0.5 ${currentQuestion.difficulty === 'Hard' ? 'text-valo-red border-valo-red/40 bg-valo-red/10' : currentQuestion.difficulty === 'Medium' ? 'text-tertiary border-tertiary/40 bg-tertiary/10' : 'text-secondary-fixed border-secondary-fixed/40 bg-secondary-fixed/10'}`,
                                                children: currentQuestion.difficulty
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 262,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-outline bg-surface-container-high border border-outline-variant/30 rounded-full px-2 py-0.5",
                                                children: game?.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 273,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-primary ml-auto",
                                                children: [
                                                    "+",
                                                    currentQuestion.points,
                                                    "pts"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 276,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-headline-md font-heading text-white font-bold mb-3 leading-snug",
                                        children: currentQuestion.prompt
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this),
                                    currentQuestion.subPrompt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-md font-body text-on-surface-variant mb-4",
                                        children: currentQuestion.subPrompt
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 283,
                                        columnNumber: 15
                                    }, this),
                                    isVoiceLine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        isVoiceLine: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 289,
                                        columnNumber: 29
                                    }, this),
                                    showHint && currentQuestion.hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 p-3 rounded-lg bg-tertiary/10 border border-tertiary/30 animate-fade-in",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-label-sm font-mono text-tertiary flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-sm",
                                                    children: "lightbulb"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 19
                                                }, this),
                                                currentQuestion.hint
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                            lineNumber: 294,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    currentQuestion.hint && !isAnswered && !hintUsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowHint(true);
                                            setHintUsed(true);
                                        },
                                        className: "flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors text-label-sm font-mono",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-sm",
                                                children: "lightbulb"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 309,
                                                columnNumber: 17
                                            }, this),
                                            "Use Hint (-50 pts)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this),
                                    hintUsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-label-sm font-mono text-outline flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-sm",
                                                children: "lightbulb"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, this),
                                            "Hint used"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (window.confirm('Surrender this quiz?')) finishQuiz();
                                        },
                                        className: "flex items-center gap-1.5 text-outline hover:text-valo-red transition-colors text-label-sm font-mono ml-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-sm",
                                                children: "exit_to_app"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                                lineNumber: 323,
                                                columnNumber: 15
                                            }, this),
                                            "Surrender"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 319,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full lg:w-1/2 flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                children: currentQuestion.answers.map((answer, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnswerButton$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: LABELS[idx],
                                        text: answer.text,
                                        onClick: ()=>handleAnswer(answer),
                                        state: answerStates[answer.id] || 'default',
                                        disabled: isAnswered
                                    }, answer.id, false, {
                                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                        lineNumber: 333,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this),
                            isAnswered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleNext,
                                className: "mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg py-4 rounded-lg uppercase tracking-widest hover:-skew-x-1 hover:scale-[1.01] transition-all animate-fade-in",
                                style: {
                                    boxShadow: '0 0 20px rgba(210,187,255,0.3)'
                                },
                                children: currentIndex + 1 >= totalQuestions && !isEndless ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined",
                                            style: {
                                                fontVariationSettings: "'FILL' 1"
                                            },
                                            children: "emoji_events"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                            lineNumber: 353,
                                            columnNumber: 19
                                        }, this),
                                        "View Results"
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        "Next Question",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined",
                                            children: "arrow_forward"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                            lineNumber: 359,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this),
                            isAnswered && selectedAnswerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-center text-label-sm font-mono animate-fade-in ${currentQuestion.answers.find((a)=>a.id === selectedAnswerId)?.isCorrect ? 'text-secondary-fixed' : 'text-valo-red'}`,
                                children: currentQuestion.answers.find((a)=>a.id === selectedAnswerId)?.isCorrect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center justify-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-sm",
                                            style: {
                                                fontVariationSettings: "'FILL' 1"
                                            },
                                            children: "check_circle"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                            lineNumber: 374,
                                            columnNumber: 19
                                        }, this),
                                        "Correct! +",
                                        currentQuestion.points + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["calculateTimeBonus"])(timeLeft, mode?.timeLimit || 20) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["calculateStreakBonus"])(streak) - (hintUsed ? 50 : 0),
                                        " pts"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                    lineNumber: 373,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center justify-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-sm",
                                            style: {
                                                fontVariationSettings: "'FILL' 1"
                                            },
                                            children: "cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                            lineNumber: 379,
                                            columnNumber: 19
                                        }, this),
                                        "Incorrect — correct answer highlighted above"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                    lineNumber: 378,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/QuizGameplayPage.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/QuizGameplayPage.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
_s(QuizGameplayPage, "wS8XHyuFwB8DkcE8AdPmw90VZtw=");
_c = QuizGameplayPage;
var _c;
__turbopack_context__.k.register(_c, "QuizGameplayPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ResultSummary.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResultSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [client] (ecmascript)");
'use client';
;
;
;
function ResultSummary({ result, onPlayAgain, onViewLeaderboard, onHome }) {
    const game = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === result.gameId);
    const mode = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["QUIZ_MODES"].find((m)=>m.id === result.modeId);
    const isPerfect = result.accuracy === 100;
    const isGreat = result.accuracy >= 80;
    const rankColors = {
        'S+': 'text-tertiary',
        S: 'text-tertiary',
        A: 'text-secondary-fixed',
        B: 'text-primary',
        C: 'text-on-surface',
        D: 'text-outline',
        F: 'text-valo-red'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex flex-col items-center gap-6 animate-fade-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-2 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high border border-tertiary/30 text-tertiary text-label-sm font-mono tracking-widest uppercase",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-base",
                                children: "military_tech"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            "Match Concluded"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-display-lg font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary uppercase italic leading-tight",
                        children: isPerfect ? 'Perfect!' : isGreat ? 'Victory' : result.accuracy >= 60 ? 'Complete' : 'Try Again'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md font-body text-on-surface-variant",
                        children: [
                            game?.name,
                            " · ",
                            mode?.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResultSummary.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-12 gap-4 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:col-span-6 glass-panel rounded-xl p-8 flex flex-col items-center justify-center text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-label-lg font-mono text-on-surface-variant uppercase tracking-widest mb-3",
                                children: "Final Score"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[72px] font-display font-black text-primary leading-none drop-shadow-[0_0_10px_rgba(210,187,255,0.3)]",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatScore"])(result.score)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            result.timeBonus > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 text-label-sm font-mono text-secondary-fixed flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-xs",
                                        children: "bolt"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this),
                                    "+",
                                    result.timeBonus,
                                    " time bonus"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex items-center gap-2 text-label-sm font-mono text-on-surface-variant",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-xs text-secondary-container",
                                        children: "trending_up"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    "Top ",
                                    100 - result.percentile,
                                    "% Global · Rank",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-bold text-base ${rankColors[result.rank] || 'text-primary'}`,
                                        children: result.rank
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:col-span-6 grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-4 flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-on-surface-variant uppercase",
                                                children: "Accuracy"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 71,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-secondary-container text-base",
                                                children: "my_location"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 72,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-headline-lg font-heading text-on-surface",
                                        children: [
                                            result.accuracy,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-secondary-container h-full rounded-full transition-all",
                                            style: {
                                                width: `${result.accuracy}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultSummary.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-4 flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-on-surface-variant uppercase",
                                                children: "Max Streak"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 82,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-valo-red text-base",
                                                style: {
                                                    fontVariationSettings: "'FILL' 1"
                                                },
                                                children: "local_fire_department"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 83,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-headline-lg font-heading text-on-surface",
                                        children: [
                                            result.maxStreak,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-valo-red text-body-md font-body ml-1",
                                                children: "x"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 87,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-4 flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-on-surface-variant uppercase",
                                                children: "Correct"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 93,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-secondary-fixed text-base",
                                                style: {
                                                    fontVariationSettings: "'FILL' 1"
                                                },
                                                children: "check_circle"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 94,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-headline-lg font-heading text-on-surface",
                                        children: [
                                            result.correctAnswers,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-on-surface-variant text-body-md font-body",
                                                children: [
                                                    "/",
                                                    result.totalQuestions
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 98,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-panel rounded-xl p-4 flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-label-sm font-mono text-on-surface-variant uppercase",
                                                children: "Time Bonus"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 104,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-tertiary text-base",
                                                style: {
                                                    fontVariationSettings: "'FILL' 1"
                                                },
                                                children: "bolt"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultSummary.tsx",
                                                lineNumber: 105,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-headline-lg font-heading text-on-surface",
                                        children: [
                                            "+",
                                            result.timeBonus
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultSummary.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResultSummary.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-center gap-3 w-full max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onPlayAgain,
                        className: "flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-mono text-label-lg px-6 py-3 rounded-lg uppercase tracking-widest hover:opacity-90 hover:-skew-x-1 transition-all",
                        style: {
                            boxShadow: '0 0 15px rgba(210,187,255,0.3)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-base",
                                style: {
                                    fontVariationSettings: "'FILL' 1"
                                },
                                children: "replay"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            "Play Again"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onViewLeaderboard,
                        className: "flex-1 flex items-center justify-center gap-2 border border-primary/40 text-primary hover:bg-primary/10 font-mono text-label-lg px-6 py-3 rounded-lg uppercase tracking-widest transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-base",
                                children: "leaderboard"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultSummary.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            "Leaderboard"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onHome,
                        className: "flex items-center justify-center gap-1 border border-outline/30 text-on-surface-variant hover:text-on-surface hover:border-outline font-mono text-label-sm px-4 py-3 rounded-lg uppercase tracking-widest transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined text-sm",
                            children: "home"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ResultSummary.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResultSummary.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResultSummary.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ResultSummary.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = ResultSummary;
var _c;
__turbopack_context__.k.register(_c, "ResultSummary");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/ResultsPage.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResultsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultSummary$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ResultSummary.tsx [client] (ecmascript)");
'use client';
;
;
function ResultsPage({ result, onNavigate }) {
    if (!result) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-on-surface-variant font-body text-body-md mb-4",
                        children: "No results to show."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/ResultsPage.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate('home'),
                        className: "text-primary font-mono hover:underline",
                        children: "Go Home"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/ResultsPage.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/ResultsPage.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/ResultsPage.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen relative overflow-hidden flex items-center justify-center px-4 md:px-12 py-28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none z-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container rounded-full mix-blend-screen filter blur-[120px] opacity-20"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/ResultsPage.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary-container rounded-full mix-blend-screen filter blur-[120px] opacity-20"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/ResultsPage.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/ResultsPage.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none z-0 overflow-hidden",
                children: Array.from({
                    length: 12
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute rounded-full bg-tertiary animate-float opacity-0",
                        style: {
                            width: `${4 + i % 3 * 3}px`,
                            height: `${4 + i % 3 * 3}px`,
                            left: `${i * 8.3 % 100}%`,
                            top: `${50 + i % 5 * 10}%`,
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: `${3 + i % 3}s`
                        }
                    }, i, false, {
                        fileName: "[project]/src/pages/ResultsPage.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/ResultsPage.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-5xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultSummary$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    result: result,
                    onPlayAgain: ()=>onNavigate('quiz-mode'),
                    onViewLeaderboard: ()=>onNavigate('leaderboard'),
                    onHome: ()=>onNavigate('home')
                }, void 0, false, {
                    fileName: "[project]/src/pages/ResultsPage.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/ResultsPage.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/ResultsPage.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = ResultsPage;
var _c;
__turbopack_context__.k.register(_c, "ResultsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LeaderboardTable.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeaderboardTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [client] (ecmascript)");
'use client';
;
;
const RANK_ICONS = {
    1: '👑',
    2: '🥈',
    3: '🥉'
};
function LeaderboardTable({ entries }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full rounded-xl overflow-hidden border border-surface-variant",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-12 gap-2 px-4 py-3 bg-surface-container-high border-b border-surface-variant",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-1 text-label-sm font-mono text-outline uppercase",
                        children: "#"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-4 text-label-sm font-mono text-outline uppercase",
                        children: "Player"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 text-label-sm font-mono text-outline uppercase text-right",
                        children: "Score"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 text-label-sm font-mono text-outline uppercase text-right",
                        children: "Acc."
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-1 text-label-sm font-mono text-outline uppercase text-right",
                        children: "Stk."
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 text-label-sm font-mono text-outline uppercase text-right hidden md:block",
                        children: "Game"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeaderboardTable.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LeaderboardTable.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            entries.map((entry)=>{
                const game = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === entry.gameId);
                const isTop3 = entry.rank <= 3;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `grid grid-cols-12 gap-2 px-4 py-3 border-b border-surface-variant/50 transition-colors ${entry.isCurrentUser ? 'bg-primary/10 border-l-2 border-l-primary' : isTop3 ? 'bg-surface-container-high/50' : 'hover:bg-surface-container'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-1 flex items-center",
                            children: RANK_ICONS[entry.rank] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base select-none",
                                children: RANK_ICONS[entry.rank]
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 48,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-label-sm font-mono text-on-surface-variant",
                                children: entry.rank
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 50,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-4 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-7 h-7 rounded-full bg-surface-variant border border-outline-variant/30 flex items-center justify-center text-xs select-none",
                                    children: entry.username[0].toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeaderboardTable.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-sm font-heading font-semibold ${entry.isCurrentUser ? 'text-primary' : 'text-on-surface'}`,
                                            children: [
                                                entry.username,
                                                entry.isCurrentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-1 text-label-sm font-mono text-primary/70",
                                                    children: "(you)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LeaderboardTable.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, this),
                                        entry.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            children: entry.badge
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                                            lineNumber: 68,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LeaderboardTable.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-2 flex items-center justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-sm font-mono font-bold ${isTop3 ? 'text-tertiary' : 'text-on-surface'}`,
                                children: entry.score.toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-2 flex items-center justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-sm font-mono ${entry.accuracy >= 90 ? 'text-secondary-fixed' : entry.accuracy >= 75 ? 'text-primary' : 'text-on-surface-variant'}`,
                                children: [
                                    entry.accuracy,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-1 flex items-center justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-mono text-on-surface-variant",
                                children: entry.streak
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-2 items-center justify-end hidden md:flex",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-label-sm font-mono text-outline bg-surface-container-high border border-outline-variant/30 px-2 py-0.5 rounded-full",
                                children: game?.shortName || entry.gameId.slice(0, 3).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderboardTable.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderboardTable.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this)
                    ]
                }, `${entry.rank}-${entry.username}`, true, {
                    fileName: "[project]/src/components/LeaderboardTable.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LeaderboardTable.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = LeaderboardTable;
var _c;
__turbopack_context__.k.register(_c, "LeaderboardTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/LeaderboardPage.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeaderboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LeaderboardTable$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LeaderboardTable.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function LeaderboardPage({ onNavigate }) {
    _s();
    const [filterGame, setFilterGame] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [filterMode, setFilterMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('global');
    const localScores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getHighScores"])();
    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MOCK_LEADERBOARD"].filter((e)=>{
        if (filterGame !== 'all' && e.gameId !== filterGame) return false;
        if (filterMode !== 'all' && e.modeId !== filterMode) return false;
        return true;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-tertiary/30 text-tertiary text-label-sm font-mono uppercase tracking-widest mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-symbols-outlined text-sm",
                                children: "emoji_events"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            "Rankings"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-display-sm font-display font-black text-on-surface mb-2",
                        children: "Leaderboard"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md font-body text-on-surface-variant",
                        children: "See how you stack up against the best players globally."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 mb-6 bg-surface-container-low rounded-lg p-1 w-fit",
                children: [
                    'global',
                    'personal'
                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTab(t),
                        className: `px-5 py-2 rounded-md text-label-sm font-mono uppercase tracking-wide transition-all ${tab === t ? 'bg-surface-container-high text-primary border border-outline-variant/30' : 'text-on-surface-variant hover:text-on-surface'}`,
                        children: t === 'global' ? 'Global' : 'My Scores'
                    }, t, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            tab === 'global' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3 mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-label-sm font-mono text-outline uppercase",
                                    children: "Game:"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setFilterGame('all'),
                                            className: `px-3 py-1 rounded-full text-label-sm font-mono uppercase text-xs border transition-all ${filterGame === 'all' ? 'bg-primary/20 border-primary/40 text-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30 hover:text-primary'}`,
                                            children: "All"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                            lineNumber: 66,
                                            columnNumber: 17
                                        }, this),
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilterGame(g.id),
                                                className: `px-3 py-1 rounded-full text-label-sm font-mono uppercase text-xs border transition-all ${filterGame === g.id ? 'bg-primary/20 border-primary/40 text-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30 hover:text-primary'}`,
                                                children: g.shortName
                                            }, g.id, false, {
                                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-4 mb-8 max-w-2xl",
                        children: filtered.slice(0, 3).map((entry, idx)=>{
                            const podiumOrder = [
                                1,
                                0,
                                2
                            ]; // 2nd, 1st, 3rd heights
                            const actual = [
                                filtered[1],
                                filtered[0],
                                filtered[2]
                            ][idx];
                            if (!actual) return null;
                            const heights = [
                                'h-24',
                                'h-32',
                                'h-20'
                            ];
                            const icons = [
                                '🥈',
                                '👑',
                                '🥉'
                            ];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex flex-col items-center gap-2 ${idx === 1 ? 'order-first md:order-none' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl select-none",
                                        children: icons[idx]
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 104,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-surface-variant border-2 border-primary/40 flex items-center justify-center text-lg font-heading font-bold text-on-surface",
                                        children: actual.username[0]
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 105,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-label-sm font-mono text-on-surface text-center truncate max-w-full",
                                        children: actual.username
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 108,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-full ${heights[idx]} rounded-t-lg flex items-end justify-center pb-3 ${idx === 1 ? 'bg-primary/20 border border-primary/30' : 'bg-surface-container-high border border-outline-variant/20'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-sm font-heading font-bold ${idx === 1 ? 'text-tertiary' : 'text-on-surface'}`,
                                            children: actual.score.toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                            lineNumber: 112,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 109,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, actual.rank, true, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 103,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LeaderboardTable$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        entries: filtered
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : /* Personal best scores */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: localScores.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-panel rounded-xl p-12 text-center border border-outline-variant/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined text-5xl text-outline mb-4 block",
                            children: "leaderboard"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                            lineNumber: 129,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-headline-md font-heading text-on-surface-variant mb-2",
                            children: "No scores yet"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                            lineNumber: 130,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-body-md font-body text-outline mb-6",
                            children: "Complete a quiz to see your personal bests here."
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                            lineNumber: 131,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onNavigate('games'),
                            className: "inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary font-mono text-label-lg px-6 py-3 rounded-lg uppercase tracking-widest hover:bg-primary/30 transition-all",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined",
                                    style: {
                                        fontVariationSettings: "'FILL' 1"
                                    },
                                    children: "play_arrow"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                    lineNumber: 136,
                                    columnNumber: 17
                                }, this),
                                "Play Now"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/LeaderboardPage.tsx",
                            lineNumber: 132,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/LeaderboardPage.tsx",
                    lineNumber: 128,
                    columnNumber: 13
                }, this) : localScores.sort((a, b)=>b.score - a.score).map((hs, idx)=>{
                    const game = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].find((g)=>g.id === hs.gameId);
                    const mode = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["QUIZ_MODES"].find((m)=>m.id === hs.modeId);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-panel rounded-xl p-5 flex items-center gap-4 border border-outline-variant/20 hover:border-primary/20 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-xl select-none",
                                children: game?.emoji
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 148,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-heading font-semibold text-on-surface",
                                        children: game?.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 152,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-label-sm font-mono text-on-surface-variant",
                                        children: mode?.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 153,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 151,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-headline-md font-heading text-primary font-bold",
                                        children: hs.score.toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 156,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-label-sm font-mono text-outline",
                                        children: [
                                            hs.accuracy,
                                            "% accuracy"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                        lineNumber: 157,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 155,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-label-sm font-mono text-outline text-right hidden sm:block",
                                children: new Date(hs.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                                lineNumber: 159,
                                columnNumber: 21
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/src/pages/LeaderboardPage.tsx",
                        lineNumber: 147,
                        columnNumber: 19
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/pages/LeaderboardPage.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/LeaderboardPage.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(LeaderboardPage, "5C6Mh5nZSMdd3yz2qMXhFZENZOc=");
_c = LeaderboardPage;
var _c;
__turbopack_context__.k.register(_c, "LeaderboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AchievementBadge.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AchievementBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
'use client';
;
const RARITY_STYLES = {
    Common: 'border-outline-variant/50 bg-surface-container-low',
    Rare: 'border-primary/40 bg-primary/5',
    Epic: 'border-secondary-container/60 bg-secondary-container/10',
    Legendary: 'border-tertiary/60 bg-tertiary/10'
};
const RARITY_LABEL_COLORS = {
    Common: 'text-outline',
    Rare: 'text-primary',
    Epic: 'text-secondary-container',
    Legendary: 'text-tertiary'
};
function AchievementBadge({ achievement, size = 'md' }) {
    const isLocked = !achievement.isUnlocked;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative border rounded-xl flex flex-col items-center text-center gap-2 transition-all duration-200 ${size === 'sm' ? 'p-3' : 'p-4'} ${RARITY_STYLES[achievement.rarity]} ${isLocked ? 'opacity-40 grayscale' : 'hover:-translate-y-0.5'}`,
        children: [
            isLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center z-10 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "material-symbols-outlined text-outline/70 text-2xl",
                    children: "lock"
                }, void 0, false, {
                    fileName: "[project]/src/components/AchievementBadge.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AchievementBadge.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-2 right-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `text-label-sm font-mono text-[10px] ${RARITY_LABEL_COLORS[achievement.rarity]}`,
                    children: achievement.rarity[0]
                }, void 0, false, {
                    fileName: "[project]/src/components/AchievementBadge.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AchievementBadge.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${size === 'sm' ? 'text-2xl' : 'text-4xl'} select-none`,
                children: achievement.icon
            }, void 0, false, {
                fileName: "[project]/src/components/AchievementBadge.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `font-heading font-semibold text-on-surface ${size === 'sm' ? 'text-xs' : 'text-sm'}`,
                        children: achievement.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/AchievementBadge.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    size === 'md' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-label-sm font-body text-on-surface-variant mt-0.5 leading-tight",
                        children: achievement.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/AchievementBadge.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    achievement.isUnlocked && achievement.unlockedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-label-sm font-mono text-outline text-[10px] mt-1",
                        children: new Date(achievement.unlockedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/AchievementBadge.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AchievementBadge.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AchievementBadge.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = AchievementBadge;
var _c;
__turbopack_context__.k.register(_c, "AchievementBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/ProfilePage.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AchievementBadge$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AchievementBadge.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProfilePage({ onNavigate }) {
    _s();
    const [username, setUsernameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('GuestPlayer');
    const [editingName, setEditingName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [nameInput, setNameInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [localScores, setLocalScores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfilePage.useEffect": ()=>{
            const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getUsername"])();
            setUsernameState(saved);
            setNameInput(saved);
            setLocalScores((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getHighScores"])());
            setResults((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getResults"])());
        }
    }["ProfilePage.useEffect"], []);
    const profile = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MOCK_USER_PROFILE"],
        username,
        totalGamesPlayed: results.length || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MOCK_USER_PROFILE"].totalGamesPlayed,
        highScore: localScores.length > 0 ? Math.max(...localScores.map((s)=>s.score)) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MOCK_USER_PROFILE"].highScore
    };
    const xpPct = Math.round(profile.xp / profile.xpToNextLevel * 100);
    const handleSaveName = ()=>{
        if (nameInput.trim()) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["saveUsername"])(nameInput.trim());
            setUsernameState(nameInput.trim());
        }
        setEditingName(false);
    };
    const unlockedCount = profile.achievements.filter((a)=>a.isUnlocked).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "pt-24 px-4 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-8 mt-4 grid grid-cols-1 md:grid-cols-12 gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:col-span-4 glass-panel rounded-xl p-6 flex flex-col items-center text-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-24 rounded-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center text-4xl border-2 border-primary/40 select-none",
                            style: {
                                boxShadow: '0 0 20px rgba(210,187,255,0.3)'
                            },
                            children: "🎮"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        editingName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-2 w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: nameInput,
                                    onChange: (e)=>setNameInput(e.target.value),
                                    onKeyDown: (e)=>e.key === 'Enter' && handleSaveName(),
                                    className: "bg-surface-container-high border border-primary/40 rounded-lg px-3 py-2 text-center text-on-surface font-heading font-bold w-full outline-none focus:border-primary",
                                    maxLength: 20,
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSaveName,
                                            className: "text-label-sm font-mono text-secondary-fixed px-3 py-1 rounded border border-secondary-fixed/40 hover:bg-secondary-fixed/10 transition-all",
                                            children: "Save"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setEditingName(false),
                                            className: "text-label-sm font-mono text-outline px-3 py-1 rounded border border-outline/30 hover:bg-surface-container transition-all",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-headline-md font-heading text-on-surface font-bold",
                                    children: profile.username
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setEditingName(true),
                                    className: "text-outline hover:text-primary transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-base",
                                        children: "edit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/ProfilePage.tsx",
                                        lineNumber: 83,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-label-sm font-mono text-on-surface-variant",
                                            children: [
                                                "Level ",
                                                profile.level
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-label-sm font-mono text-outline",
                                            children: [
                                                profile.xp,
                                                " / ",
                                                profile.xpToNextLevel,
                                                " XP"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-2 bg-surface-container-high rounded-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full bg-gradient-to-r from-primary-container to-secondary-container rounded-full transition-all",
                                        style: {
                                            width: `${xpPct}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/ProfilePage.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3 w-full mt-2",
                            children: [
                                {
                                    label: 'Games Played',
                                    value: profile.totalGamesPlayed,
                                    icon: 'sports_esports'
                                },
                                {
                                    label: 'High Score',
                                    value: profile.highScore.toLocaleString(),
                                    icon: 'emoji_events'
                                },
                                {
                                    label: 'Accuracy',
                                    value: `${profile.accuracy}%`,
                                    icon: 'my_location'
                                },
                                {
                                    label: 'Max Streak',
                                    value: `${profile.maxStreak}x`,
                                    icon: 'local_fire_department'
                                }
                            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-surface-container-high rounded-lg p-3 border border-outline-variant/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-primary text-sm block mb-1",
                                            style: {
                                                fontVariationSettings: "'FILL' 1"
                                            },
                                            children: s.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-headline-md font-heading text-on-surface font-bold",
                                            children: s.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 112,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-label-sm font-mono text-outline text-xs",
                                            children: s.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, s.label, true, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full p-3 rounded-lg bg-tertiary/10 border border-tertiary/20 text-left",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-label-sm font-mono text-tertiary flex items-start gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-sm mt-0.5",
                                        children: "info"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/ProfilePage.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    "Playing as guest. Scores are saved locally to this device only."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/ProfilePage.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/ProfilePage.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:col-span-8 flex flex-col gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-panel rounded-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-headline-md font-heading text-on-surface mb-4",
                                    children: "Game Performance"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].map((game)=>{
                                        const stat = profile.gamesStats.find((s)=>s.gameId === game.id);
                                        const local = localScores.find((s)=>s.gameId === game.id);
                                        const hs = local?.score || stat?.highScore || 0;
                                        const acc = local?.accuracy || stat?.accuracy || 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4 p-3 rounded-lg bg-surface-container-high border border-outline-variant/20 hover:border-primary/20 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl select-none",
                                                    children: game.emoji
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-heading font-semibold text-on-surface",
                                                                    children: game.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                                    lineNumber: 143,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-label-sm font-mono text-outline",
                                                                    children: [
                                                                        stat?.gamesPlayed || 0,
                                                                        " games"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                                    lineNumber: 144,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-full h-1 bg-surface-variant rounded-full overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full bg-primary rounded-full",
                                                                style: {
                                                                    width: `${acc}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/ProfilePage.tsx",
                                                                lineNumber: 147,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-heading font-bold text-primary",
                                                            children: hs > 0 ? hs.toLocaleString() : '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-label-sm font-mono text-outline",
                                                            children: acc > 0 ? `${acc}%` : '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 152,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, game.id, true, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 139,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-panel rounded-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-headline-md font-heading text-on-surface",
                                            children: "Achievements"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-label-sm font-mono text-on-surface-variant",
                                            children: [
                                                unlockedCount,
                                                "/",
                                                profile.achievements.length,
                                                " unlocked"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                                    children: profile.achievements.map((ach)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AchievementBadge$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            achievement: ach,
                                            size: "sm"
                                        }, ach.id, false, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-panel rounded-xl p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-headline-md font-heading text-on-surface mb-4",
                                    children: "Recent Games"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: results.slice(0, 5).map((r, i)=>{
                                        const g = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GAMES"].find((gm)=>gm.id === r.gameId);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-outline-variant/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl select-none",
                                                    children: g?.emoji
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-heading text-on-surface",
                                                            children: g?.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-label-sm font-mono text-outline",
                                                            children: new Date(r.date).toLocaleDateString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-mono font-bold text-primary",
                                                            children: r.score.toLocaleString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-label-sm font-mono text-outline",
                                                            children: [
                                                                r.accuracy,
                                                                "% acc · Rank ",
                                                                r.rank
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/pages/ProfilePage.tsx",
                                            lineNumber: 183,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/ProfilePage.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/ProfilePage.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/ProfilePage.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/ProfilePage.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/ProfilePage.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(ProfilePage, "3ZIfrCt6J4ryNelJQXo2Zeuby1g=");
_c = ProfilePage;
var _c;
__turbopack_context__.k.register(_c, "ProfilePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NavBar.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LandingPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/LandingPage.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$GameSelectionPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/GameSelectionPage.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$QuizModeSelectionPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/QuizModeSelectionPage.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$QuizGameplayPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/QuizGameplayPage.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$ResultsPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/ResultsPage.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LeaderboardPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/LeaderboardPage.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$ProfilePage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/ProfilePage.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/index.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
const Home = ()=>{
    _s();
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('home');
    const [selectedGame, setSelectedGame] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedMode, setSelectedMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quizResult, setQuizResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [username] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        "Home.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getUsername"])();
            //TURBOPACK unreachable
            ;
        }
    }["Home.useState"]);
    const handleNavigate = (page)=>{
        setCurrentPage(page);
        // Scroll to top on page change
        if ("TURBOPACK compile-time truthy", 1) window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const handleSelectGame = (gameId)=>{
        setSelectedGame(gameId);
    };
    const handleSelectMode = (modeId)=>{
        setSelectedMode(modeId);
    };
    const handleQuizComplete = (result)=>{
        setQuizResult(result);
    };
    const showNav = currentPage !== 'quiz';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "GameGuess Arena — TRIVIA-X"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Test your gaming knowledge — VALORANT, Pokémon, LoL, MLBB, and Tekken trivia."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-background bg-pattern dark",
                children: [
                    showNav && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        currentPage: currentPage,
                        onNavigate: handleNavigate,
                        username: username
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'home' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LandingPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        onNavigate: handleNavigate
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'games' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$GameSelectionPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        onNavigate: handleNavigate,
                        onSelectGame: handleSelectGame
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'quiz-mode' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$QuizModeSelectionPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        selectedGameId: selectedGame,
                        onNavigate: handleNavigate,
                        onSelectMode: handleSelectMode
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'quiz' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$QuizGameplayPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        gameId: selectedGame,
                        modeId: selectedMode,
                        onNavigate: handleNavigate,
                        onQuizComplete: handleQuizComplete
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'results' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$ResultsPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        result: quizResult,
                        onNavigate: handleNavigate
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'leaderboard' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LeaderboardPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        onNavigate: handleNavigate
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentPage === 'profile' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$ProfilePage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        onNavigate: handleNavigate
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(Home, "MC+XpT7jPsbCsZSpPbkfLx8J4w4=");
_c = Home;
const __TURBOPACK__default__export__ = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if ("TURBOPACK compile-time truthy", 1) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/src/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1564bgh._.js.map