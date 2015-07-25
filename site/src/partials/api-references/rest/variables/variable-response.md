<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean/Object</td>
    <td><%- @partial('api-references/rest/variables/variable-response-value.html.eco', @, {deserializationParameter: @deserializationParameter}) %></td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td><%- @partial('api-references/rest/variables/variable-response-type.html.eco', @, {}) %></td>
  </tr>
  <tr>
    <td>valueInfo</td>
    <td>Object</td>
    <td>
      <%- @partial('api-references/rest/variables/variable-response-valueinfo.html.eco', @, {}) %>
    </td>
  </tr>
  <% for property, value of @additionalProperties: %>
    <tr>
      <td><%= property %></td>
      <td><%- value.type %></td>
      <td><%- value.description %></td>
    </tr>
  <% end %>
</table>