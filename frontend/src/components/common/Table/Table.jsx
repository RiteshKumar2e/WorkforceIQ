import React from 'react'
import './Table.css'

const Table = ({ columns, data, striped = true, hover = true, actions }) => {
  return (
    <div className="table-wrapper">
      <table className={`${striped ? 'table-striped' : ''} ${hover ? 'table-hover' : ''}`}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="table-actions">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="table-empty">
                <p>No data available</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
