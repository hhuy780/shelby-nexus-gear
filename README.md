# 🚀 Shelby Nexus: Decentralized 3D Asset Storage & Rendering

![Shelby Nexus Banner](https://via.placeholder.com/1200x400/0f172a/06b6d4?text=SHELBY+NEXUS+-+Decentralized+3D+Stream)

## 1. Project Description
**The Problem:** In the Web3 and GameFi space, storing heavy graphical assets (like 3D models and high-res NFTs) directly on-chain is incredibly expensive and slow. Conversely, relying on Web2 cloud storage compromises the core decentralized nature of Web3 projects.
**The Solution:** **Shelby Nexus** acts as a bridge (Nexus) allowing users and GameFi developers to upload, store, and stream 3D assets using **Shelby Protocol's** decentralized storage infrastructure, authenticated via the **Aptos Network (Petra Wallet)**.
**Output Example:** A user connects their Petra wallet, uploads a `.glb` sword model, signs a micro-transaction for gas, and instantly gets a sub-second decentralized CDN link that renders the 3D model interactively on their browser.
**Target Audience:** Web3 Game Developers, 3D Digital Artists, Metaverse Builders, and NFT Creators.

---

## 2. System Architecture
Shelby Nexus is built on a modern, lightweight 3-tier architecture designed for browser-first Web3 interaction.

*   **Presentation Layer (Frontend):** Next.js 14, Tailwind CSS (Glassmorphism UI), and `@react-three/fiber` for real-time 3D rendering.
*   **Web3/Auth Layer:** `@aptos-labs/wallet-adapter-react` interfacing with browser extensions (Petra Wallet) for transaction signing.
*   **Storage/Data Layer:** Shelby Protocol Network (Shelbynet) for decentralized blob storage and fast CDN delivery.

**5-Step Data Flow:**
1.  **Auth:** User connects Petra Wallet -> System retrieves `accountAddress`.
2.  **Input:** User selects a 3D asset (`.glb`/`.gltf`) -> System validates the file format.
3.  **Sign:** Application requests an Aptos micro-transaction (0.000001 APT) via Petra extension to verify on-chain intent and cover network gas fees.
4.  **Upload:** Upon successful signature, the asset is pushed to the Shelby API endpoint.
5.  **Render:** Shelby returns a decentralized CDN URL -> `<Canvas>` engine streams and renders the 3D model in real-time.

---

## 3. Implementation Phases
*   **Phase 1: Foundation (Week 1)** - Next.js setup, Tailwind configuration, and UI scaffolding.
*   **Phase 2: Web3 Integration (Week 1)** - Integrating Aptos Wallet Adapter, implementing Connect/Disconnect logic, and triggering Petra pop-ups.
*   **Phase 3: Decentralized Storage (Week 2)** - Integrating Shelby SDK/API. Developing the custom bypass routing to handle Early Access SDK limitations.
*   **Phase 4: 3D Engine & Polish (Week 2)** - Implementing Three.js Canvas, lighting, auto-rotation, and the Hackathon-specific "Mirror Fallback" mode for seamless demos.

---

## 4. Tools & Resources
| Category | Tool / Technology | Purpose | Cost |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Core application framework | Free |
| **Styling** | Tailwind CSS & Lucide | Glassmorphism UI and icons | Free |
| **Web3 Auth** | Aptos Wallet Adapter | Petra Wallet connection | Free |
| **3D Rendering** | React Three Fiber / Drei | Browser-based WebGL engine | Free |
| **Storage** | Shelby Protocol | Decentralized asset hosting | Testnet/Shelbynet (Free) |
| **Deployment** | Vercel & GitHub | CI/CD and hosting | Free |

---

## 5. Directory Structure
```text
shelby-nexus/
├── app/
│   ├── layout.tsx         # Root layout & Wallet Provider wrapper
│   ├── page.tsx           # Main entry point importing NexusDashboard
│   └── globals.css        # Tailwind directives
├── components/
│   └── NexusDashboard.tsx # Core UI, 3D Canvas, and Upload Logic
├── services/
│   └── uploader/
│       └── shelbyClient.ts # Shelby API bypass and Fallback logic
├── public/                # Static assets
├── .env.local             # Environment variables (Shelby API Key)
├── tailwind.config.ts     # UI styling config
└── package.json           # Dependencies
