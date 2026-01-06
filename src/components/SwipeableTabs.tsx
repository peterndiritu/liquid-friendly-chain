import React, { useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Tab {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface SwipeableTabsProps {
  tabs: Tab[];
  defaultValue?: string;
  onTabChange?: (value: string) => void;
  className?: string;
}

export function SwipeableTabs({
  tabs,
  defaultValue,
  onTabChange,
  className,
}: SwipeableTabsProps) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const currentIndex = tabs.findIndex((t) => t.value === activeTab);

  const goToNext = useCallback(() => {
    if (currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1].value;
      setActiveTab(nextTab);
      onTabChange?.(nextTab);
    }
  }, [currentIndex, tabs, onTabChange]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      const prevTab = tabs[currentIndex - 1].value;
      setActiveTab(prevTab);
      onTabChange?.(prevTab);
    }
  }, [currentIndex, tabs, onTabChange]);

  const swipeHandlers = useSwipeNavigation({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
    enabled: isMobile,
    threshold: 50,
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className={cn("w-full", className)}
    >
      {/* Tab List - Scrollable on mobile */}
      <TabsList className="w-full h-auto flex-wrap justify-start gap-1 bg-muted/50 p-1 md:p-1.5 rounded-lg mb-4">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "flex-1 min-w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm",
              "text-xs md:text-sm py-2 md:py-2.5 px-2 md:px-4 gap-1 md:gap-2"
            )}
          >
            {tab.icon}
            <span className="truncate">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Swipeable Content Area */}
      <div
        {...swipeHandlers}
        className="relative overflow-hidden touch-pan-y"
      >
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className={cn(
              "mt-0 focus-visible:outline-none focus-visible:ring-0",
              "data-[state=active]:animate-fade-in"
            )}
          >
            {tab.content}
          </TabsContent>
        ))}
      </div>

      {/* Dot Indicators - Mobile only */}
      {isMobile && (
        <div className="flex justify-center gap-1.5 mt-4">
          {tabs.map((tab, index) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-primary w-4"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to ${tab.label}`}
            />
          ))}
        </div>
      )}
    </Tabs>
  );
}
