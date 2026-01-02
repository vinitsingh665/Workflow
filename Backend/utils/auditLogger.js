/**
 * auditLogger.js
 *
 * Central audit logging utility.
 *
 * WHY this file exists:
 * - Ensures every important action is logged
 * - Keeps audit logic in one place
 * - Makes system compliant & traceable
 *
 * Controllers call this function after every CREATE / APPROVE / REJECT
 */

const db = require("../config/db");

/**
 * Logs an audit record into audit_logs table
 *
 * @param {Object} data
 * @param {String} data.entity        - Entity name (REQUEST, APPROVAL)
 * @param {Number} data.entity_id     - ID of entity
 * @param {String} data.action        - Action performed (CREATE, APPROVE, REJECT)
 * @param {Object|null} data.old_value- Previous state
 * @param {Object|null} data.new_value- New state
 * @param {Number} data.performed_by - User ID who did the action
 */
const logAudit = async ({
  entity,
  entity_id,
  action,
  old_value,
  new_value,
  performed_by
}) => {

  const query = `
    INSERT INTO audit_logs
    (entity, entity_id, action, old_value, new_value, performed_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  await db.promise().query(query, [
    entity,
    entity_id,
    action,
    old_value ? JSON.stringify(old_value) : null,
    new_value ? JSON.stringify(new_value) : null,
    performed_by
  ]);
};

module.exports = logAudit;
