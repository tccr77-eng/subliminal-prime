import { createContext, useContext, useState } from "react";

interface AnnouncementContextType {
  visible: boolean;
  dismiss: () => void;
}

const AnnouncementContext = createContext<AnnouncementContextType>({
  visible: true,
  dismiss: () => {},
});

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  return (
    <AnnouncementContext.Provider value={{ visible, dismiss: () => setVisible(false) }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncement() {
  return useContext(AnnouncementContext);
}
