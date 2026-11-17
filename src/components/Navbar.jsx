const tabs = [
  { id: 'lore', label: 'Brief Story' },
  { id: 'phases', label: 'Phases & Lyrics' },
  { id: 'ghouls', label: 'Nameless Ghouls' },
  { id: 'papas', label: 'Papa Focus' },
  { id: 'albums', label: 'MY FAV ALBUMS' }
];

function Navbar({ activeTab, onTabChange }) {
  function handleKeyDown(event, index) {
    let nextIndex;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      const nextTab = tabs[nextIndex];
      onTabChange(nextTab.id);
      document.getElementById(`tab-${nextTab.id}`).focus();
    }
  }

  return (
    <nav>
      <ul role="tablist" aria-label="Ghost Tribute sections">
        {tabs.map((tab, index) => (
          <li key={tab.id}>
            <button
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;