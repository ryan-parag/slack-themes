import Filters from '@components/Filters';
import Sort from '@components/Sort';
import Theme from '@components/Theme';

const ThemeList = ({filters, selected, setSelected, copyString, filteredThemes, minimalHeader, changeTheme, sorts, sorting, setSorting}) => {

  return(
    <div className="p-4 xl:p-8">
      <input style={{ opacity: '0', width: '0', height: '0', position: 'fixed', top: '-9999px', left: '-9999px' }}type="text" value={copyString} readOnly />
      <div className="flex justify-between items-center mb-4">
        <div className="inline-flex items-center">
          <Filters
            filters={filters}
            setSelected={setSelected}
            selected={selected}
          />
          {
            selected !== null && (
              <button className="shadow-md transition ml-2 text-sm py-2.5 lg:py-2 px-3 rounded-md border border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setSelected(null)}>Reset</button>
            )
          }
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-16">
        {
          filteredThemes.map((item,i) => (
            <Theme
              key={item.id}
              theme={item}
              changeTheme={changeTheme}
              minimalHeader={minimalHeader}
              favorite={true}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ThemeList